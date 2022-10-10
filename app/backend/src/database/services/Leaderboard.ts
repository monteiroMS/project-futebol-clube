// eslint-disable-next-line import/no-cycle
import TeamStats from './classes/TeamStats';
import { iTeamStats } from '../../interfaces';
import TeamService from './Team';

export default class LeaderboardService {
  private _leaderboard: iTeamStats[] = [];

  constructor(
    private _teamService = new TeamService(),
  ) {}

  public getLeaderboard = async (homeOrAway: 'homeTeam' | 'awayTeam') => {
    await this.getAllTeamsStats(homeOrAway);
    this.sortByGoalsOwn();
    this.sortByGoalsFavor();
    this.sortByGoalsBalance();
    this.sortByVictories();
    this.sortByTotalPoints();
    this._leaderboard.reverse();
    return this._leaderboard;
  };

  private getAllTeamsStats = async (homeOrAway: 'homeTeam' | 'awayTeam'): Promise<iTeamStats[]> => {
    const allTeams = await this._teamService.getAll();
    this._leaderboard = await Promise.all(allTeams.map(async (team) => {
      const teamLeaderboard = new TeamStats(team.id, homeOrAway);
      await teamLeaderboard.runInfoUpdate();
      return {
        name: team.teamName,
        totalPoints: teamLeaderboard.totalPoints,
        totalGames: teamLeaderboard.totalGames,
        totalVictories: teamLeaderboard.totalVictories,
        totalDraws: teamLeaderboard.totalDraws,
        totalLosses: teamLeaderboard.totalLosses,
        goalsFavor: teamLeaderboard.goalsFavor,
        goalsOwn: teamLeaderboard.goalsOwn,
        goalsBalance: teamLeaderboard.goalsBalance,
        efficiency: Number(teamLeaderboard.efficiency.toFixed(2)),
      };
    }));
    return this._leaderboard;
  };

  private sortByTotalPoints = () => {
    this._leaderboard.sort((a, b) => a.totalPoints - b.totalPoints);
  };

  private sortByVictories = () => {
    this._leaderboard.sort((a, b) => a.totalVictories - b.totalVictories);
  };

  private sortByGoalsBalance = () => {
    this._leaderboard.sort((a, b) => a.goalsBalance - b.goalsBalance);
  };

  private sortByGoalsFavor = () => {
    this._leaderboard.sort((a, b) => a.goalsFavor - b.goalsFavor);
  };

  private sortByGoalsOwn = () => {
    this._leaderboard.sort((a, b) => a.goalsOwn - b.goalsOwn);
  };
}
