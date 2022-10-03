import Team from '../models/Team';

export default class TeamService {
  constructor(
    private _model = Team,
  ) {}

  public async getAll() {
    const teams = await this._model.findAll();
    return teams;
  }
}
