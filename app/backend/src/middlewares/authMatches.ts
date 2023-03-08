import { NextFunction, Request, Response } from 'express';

export default class authMatches {
  static verifyInfo(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    const invalidMessage = { message: 'It is not possible to create a match with two equal teams' };

    if (homeTeamId === awayTeamId) return res.status(422).json(invalidMessage);

    next();
  }
}
