import {observable, ObservableMap, action, computed, autorun} from "mobx";
import {Player, isPlayerValid} from "./player";
import {StringMap} from "../utils/maps";
import {persist} from "mobx-persist/lib";
import {GameState} from "./game-states";
import {AppSnackBar} from "../views/snack-bar/snack-bar-store";
import {arrayPickRandom} from "../utils/array-pick-random";
import {Teams} from "./teams";
import {Word} from "./word";
import {TeamPlayers} from "./round";

export const WORDS_COUNT = 5;
export class Game {

  constructor() {
    this.initialize();
  }

  private initialize() {
    this.wordsCnt = WORDS_COUNT;
    this.players = new ObservableMap({} as StringMap<Player>);
    this.playersByTeam = new ObservableMap({} as StringMap<TeamPlayers>);
    this.state = GameState.Settings;
  }

  @persist
  @observable
  wordsCnt;

  @persist
  @observable
  state: GameState;

  @persist("map", Player)
  @observable
  players: ObservableMap<Player>;

  @action
  setPlayer(player: Player) {
    this.players.set(player.id, player);
  }

  @action
  setWordCnt(wordsCnt: number) {
    this.wordsCnt = wordsCnt;
  }

  @action
  startGame() {
    if (!this.canStart) {
      AppSnackBar.setMessage("Заполните все необходимы настройки для анчала игры");
      return;
    }
    this.setPlayersTeams();
    this.state = GameState.Commands;
  }

  private setPlayersTeams() {
    const players = this.players.values();
    while (players.length) {
      const player1 = arrayPickRandom(players);
      const player2 = arrayPickRandom(players);
      player1 && (player1.team = Teams.Team1);
      player2 && (player2.team = Teams.Team2);
    }
    this.playersByTeam = observable.map({
      [Teams.Team1.toString()]: new TeamPlayers(),
      [Teams.Team2.toString()]: new TeamPlayers()
    });
    this.players.values().forEach(player =>
        this.playersByTeam.get(player.team.toString()).playerIds.push(player.id)
    );
  }

  @computed get team1Players() {
    return this.getPlayersByTeam(Teams.Team1);
  }

  @computed get team2Players() {
    return this.getPlayersByTeam(Teams.Team2);
  }

  @computed get allWords(): Array<Word> {
    let words: Array<Word> = [];
    this.players.values().forEach(player => words = words.concat(player.words));
    return words;
  }

  private getPlayersByTeam(team: Teams) {
    return this.players.values().filter(player => player.team === team);
  }

  @action
  reset() {
    this.initialize();
  }

  @computed get canStart() {
    if (this.players.keys().length < 3) {
      return false;
    }
    return !this.players.values().some(player => !isPlayerValid(player, this))
  }

  @persist('map', TeamPlayers)
  @observable
  playersByTeam: ObservableMap<TeamPlayers>;
}
