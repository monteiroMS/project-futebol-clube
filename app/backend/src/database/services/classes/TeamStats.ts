// eslint-disable-next-line import/no-cycle
import { MatchService } from '..';

export default class TeamStats {
  private _totalPoints = 0;
  private _totalGames = 0;
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;
  private _goalsBalance = 0;

  constructor(
    private _teamId: number,
    private _homeOrAway: 'homeTeam' | 'awayTeam',
    private _matchService = new MatchService(),
  ) {}

  private newWin() {
    this._totalPoints += 3;
    this._totalVictories += 1;
  }

  private newDraw() {
    this._totalPoints += 1;
    this._totalDraws += 1;
  }

  private newLoss() {
    this._totalLosses += 1;
  }

  public getMatches = async () => {
    const matches = await this._matchService.getAllByTeamId(this._homeOrAway, this._teamId);
    return matches;
  };

  public runInfoUpdate = async () => {
    await this.updateGoals();
    await this.updateMatches();
    await this.updatePoints();
  };

  private updateGoals = async () => {
    const matches = await this.getMatches();
    matches.forEach((match) => {
      this._goalsFavor += this._homeOrAway === 'homeTeam'
        ? match.homeTeamGoals
        : match.awayTeamGoals;
      this._goalsOwn += this._homeOrAway === 'homeTeam'
        ? match.awayTeamGoals
        : match.homeTeamGoals;
      this._goalsBalance = this._goalsFavor - this._goalsOwn;
    });
  };

  private updatePoints = async () => {
    const matches = await this.getMatches();
    matches.forEach((match) => {
      if (match.homeTeam === this._teamId) {
        if (match.homeTeamGoals > match.awayTeamGoals) {
          this.newWin();
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.newDraw();
        } else { this.newLoss(); }
      } else if (match.homeTeam !== this._teamId) {
        if (match.awayTeamGoals > match.homeTeamGoals) {
          this.newWin();
        } else if (match.homeTeamGoals === match.awayTeamGoals) {
          this.newDraw();
        } else { this.newLoss(); }
      }
    });
  };

  private updateMatches = async () => {
    const matches = await this.getMatches();
    this._totalGames = matches.length;
  };

  public get totalPoints() { return this._totalPoints; }

  public get totalGames() { return this._totalGames; }

  public get totalVictories() { return this._totalVictories; }

  public get totalLosses() { return this._totalLosses; }

  public get totalDraws() { return this._totalDraws; }

  public get goalsFavor() { return this._goalsFavor; }

  public get goalsOwn() { return this._goalsOwn; }

  public get goalsBalance() { return this._goalsBalance; }

  public get efficiency() {
    return (this._totalPoints / (this._totalGames * 3)) * 100;
  }
}
