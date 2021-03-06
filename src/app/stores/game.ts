import {observable, ObservableMap, action, computed, reaction} from "mobx";
import {Player, isPlayerValid} from "./player";
import {StringMap} from "../utils/maps";
import {persist} from "mobx-persist/lib";
import {GameState} from "./game-states";
import {AppSnackBar} from "../views/snack-bar/snack-bar-store";
import {arrayPickRandom} from "../utils/array-pick-random";
import {Teams} from "./teams";
import {Word} from "./word";
import {TeamPlayers, Round} from "./round";
import {randomInt} from "../utils/random-int";
import {now} from "mobx-utils";
import Bluebird = require("bluebird");

export const WORDS_COUNT = 5;
export const ROUND_TIME = 30;

export class Game {

  constructor() {
    this.initialize();
    reaction(() => this.currentPlayerStarted && this.timeLeft <= 0,
      () => {
        this.resetCurrentPlayerTime();
      })
  }

  @action
  resetCurrentPlayerTime() {
    this.currentPlayerStartedTime = undefined;
    this.currentRound.dropWord();
  }

  private initialize() {
    this.wordsCnt = WORDS_COUNT;
    this.players = new ObservableMap({} as StringMap<Player>);
    this.playersByTeam = [];
    this.state = GameState.Settings;
    this.rounds = [];
    this.currentPlayerStarted = false;
    this.currentPlayerStartedTime = undefined;
    this.currentPlayerWordsResolve = 0;
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

  // порядок игроков
  @persist("list", TeamPlayers)
  @observable
  playersByTeam: Array<TeamPlayers>;

  @persist("list", Round)
  @observable
  rounds = [];

  @persist
  @observable
  currentTeam: Teams;

  @persist
  @observable
  currentPlayerStarted = false;

  @persist
  @observable
  currentPlayerStartedTime;

  @persist
  @observable
  currentPlayerWordsResolve = 0;

  @computed
  get currentRoundIndex(): number {
    return this.rounds.length - 1;
  }

  @computed
  get currentRound(): Round {
    if (!this.rounds.length) {
      return;
    }
    return this.rounds[this.currentRoundIndex];
  }

  @computed
  get currentRoundName() {
    return `Раунд ${this.currentRoundIndex + 1}`;
  }

  @computed
  get currentTeamPlayers(): Array<string> {
    const playersByTeam = this.playersByTeam[this.currentTeam];
    return playersByTeam && playersByTeam.playerIds;
  }

  @computed
  get currentPlayer(): Player {
    const playersByTeam = this.currentTeamPlayers;
    if (!playersByTeam) {
      return;
    }
    return this.players.get(playersByTeam[0]);
  }

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
    this.rounds = [];
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
    this.playersByTeam = [new TeamPlayers(), new TeamPlayers()];
    this.players.values().forEach(player => {
        player.resetResults();
        this.playersByTeam[player.team].playerIds.push(player.id);
      }
    );
    this.setCurrentTeam();
  }

  private setCurrentTeam() {
    this.currentTeam = randomInt(0, 2);
  }

  @computed
  get team1Players(): Array<Player> {
    return this.getPlayersByTeam(Teams.Team1);
  }

  @computed
  get team2Players(): Array<Player> {
    return this.getPlayersByTeam(Teams.Team2);
  }

  roundResultByTeam(team: Teams, roundIndex: number) {
    let res = 0;
    this.getPlayersByTeam(team).forEach(player =>
      res += player.resultsByRound[roundIndex].resolvedWords.length
    );
    return res;
  }

  @computed
  get team1PlayersCurrRoundResults(): number {
    return this.roundResultByTeam(Teams.Team1, this.currentRoundIndex);
  }

  @computed
  get team2PlayersCurrRoundResults(): number {
    return this.roundResultByTeam(Teams.Team2, this.currentRoundIndex);
  }

  gameResults(team: Teams): number {
    let res = 0;
    for (let i = 0; i < this.rounds.length; i++) {
      res += this.roundResultByTeam(team, i);
    }
    return res;

  }

  @computed
  get team1GameResults(): number {
    return this.gameResults(Teams.Team1);
  }

  @computed
  get team2GameResults(): number {
    return this.gameResults(Teams.Team2);
  }

  @computed
  get allWords(): StringMap<Word> {
    let words: StringMap<Word> = {};
    this.players.values().forEach(player => player.words.forEach(word => {
      words[word.id] = word;
    }));
    return words;
  }

  private getPlayersByTeam(team: Teams): Array<Player> {
    return this.players.values().filter(player => player.team === team);
  }

  @action
  reset() {
    this.initialize();
  }

  @computed
  get canStart(): boolean {
    if (this.players.keys().length < 3) {
      return false;
    }
    return !this.players.values().some(player => !isPlayerValid(player, this))
  }

  @action
  startNextRound() {
    if (this.isGameEnd) {
      return;
    }
    this.rounds.push(new Round(this));
    this.resetCurrentPlayerStarted();
    this.resetCurrentPlayerTime();
    this.state = GameState.Play;
  }

  @computed
  get timeLeft(): number {
    if (!this.currentPlayerStarted) {
      return ROUND_TIME;
    }
    if (!this.currentPlayerStartedTime) {
      return 0;
    }
    let elapsed = now() - this.currentPlayerStartedTime;
    if (elapsed < 0) {
      elapsed = Date.now() - this.currentPlayerStartedTime;
    }
    const res = ROUND_TIME - Math.floor((elapsed) / 1000)
    return res;
  }

  @action
  startShowWords() {
    this.currentPlayerStartedTime = Date.now();
    this.currentPlayerStarted = true;
    this.currentRound.pickWord();
  }

  @computed
  get currentWord(): string {
    const allWords = this.allWords[this.currentRound.currentWordId];
    return allWords && allWords.name;
  }

  @observable
  resolveButtonDisabled = false;

  @action
  disableResolveButton() {
    this.resolveButtonDisabled = true;
    Bluebird.delay(1000).then(() => {
      this.resolveButtonDisabled = false;
    })
  }

  @action
  resolveCurrentWord() {
    this.currentPlayer.resolveWord(this.currentRoundIndex, this.currentRound.currentWordId);
    this.currentPlayerWordsResolve++;
    this.currentRound.pickWord();
    if (!this.currentRound.currentWordId) {
      this.resetCurrentPlayerTime();
    }
    this.disableResolveButton();
  }

  @action
  resetCurrentPlayerStarted() {
    this.currentPlayerStarted = false;
    this.currentPlayerWordsResolve = 0;
  }

  @action
  nextPlayer() {
    const currentTeamPlayers = this.currentTeamPlayers;
    this.currentTeam = this.currentTeam === Teams.Team1 && Teams.Team2 || Teams.Team1;
    currentTeamPlayers.push(currentTeamPlayers.shift());
    this.resetCurrentPlayerStarted();
  }

  @action
  endRound() {
    this.nextPlayer();
    this.state = GameState.RoundEnd;
  }

  @computed
  get isGameEnd(): boolean {
    return this.rounds.length === 3;
  }

  @action
  createTestData() {
    this.initialize();
    this.wordsCnt = 3;
    this.addTestPlayerWithWords("Вася", ["Пушкин", "Есенин", "Моцарт"]);
    this.addTestPlayerWithWords("Петя", ["Энштейн", "Винни-Пух", "Гагарин"]);
    this.addTestPlayerWithWords("Маша", ["Гермиона", "Петр I", "Дима Пепеляев"]);
  }

  @action
  addTestPlayerWithWords(name: string, words: Array<string>) {
    const player = new Player(name);
    words.forEach(word => player.words.push(new Word(word)));
    this.players.set(player.id, player);
  }

  @action
  finishGame() {
    this.state = GameState.GameOver
  }

}
