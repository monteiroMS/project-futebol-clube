import Team from '../models/Team';

export default class TeamService {
  constructor(
    private _model = Team,
  ) {}

  public async getAll() {
    const teams = await this._model.findAll();
    return teams;
  }

  public async getById(id: number) {
    const team = await this._model.findByPk(id);

    if (!team) throw new Error('Team not found');

    return team;
  }
}
