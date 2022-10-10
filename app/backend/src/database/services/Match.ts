import { Op } from 'sequelize';
import { iCreateMatch, iGoalUpdate, iMatch } from '../../interfaces';
import { BooleanString, HomeAwayOrBoth } from '../../types';
import Match from '../models/Match';
import Team from '../models/Team';

export default class MatchService {
  constructor(
    private _model = Match,
  ) {}

  public async getAll() {
    const matches = await this._model.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches as iMatch[];
  }

  public async filterByProgress(inProgress: BooleanString) {
    const matches = await this._model.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }

  public async create(match: iCreateMatch) {
    const newMatch = await this._model.create(match);
    return newMatch;
  }

  public async updateProgress(id: number) {
    const result = await this._model.update(
      { inProgress: false },
      { where: { id } },
    );
    return result;
  }

  public async getById(id: number) {
    const match = await this._model.findOne({ where: { id } });
    return match;
  }

  public async updateGoals(goalsUpdate: iGoalUpdate, id: number) {
    const result = await this._model.update(
      goalsUpdate,
      { where: { id } },
    );
    return result;
  }

  public async getAllByTeamId(homeOrAway: HomeAwayOrBoth, teamId: number) {
    if (homeOrAway === 'bothTeams') {
      const matches = await this._model.findAll({
        where: {
          [Op.or]: [{ homeTeam: teamId }, { awayTeam: teamId }],
          [Op.and]: { inProgress: false },
        },
      });
      return matches as iMatch[];
    }
    const matches = await this._model.findAll({
      where: { [homeOrAway]: teamId, inProgress: false },
    });
    return matches as iMatch[];
  }
}
