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

    return matches;
  }

  public async filterByProgress(inProgress: string) {
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
}