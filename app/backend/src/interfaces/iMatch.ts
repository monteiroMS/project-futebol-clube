import { Model } from 'sequelize/types';

export default interface iMatch extends Model {
  id: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress: false,
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}
