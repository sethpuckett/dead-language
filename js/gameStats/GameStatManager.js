import { letterGrades, endgame } from '../config';

export default class {
  /*
  Params are the same as those for the Endgame screen
  Params: {
      status: endgame.win | endgame.lose,
      zombiesKilled: integer,
      hitsTaken: integer,
      cashCollected: integer,
      foodEaten: integer,
      mercenaryKills: integer,
      shotsFired: integer,
      shotsHit: integer,
  }
  */
  calculateLetterGrade(params) {
    // loss is an automatic F
    if (params.status === endgame.lose) {
      return letterGrades.f;
    }

    const hitsTakenScore = this.getHitsTakenScore(params.hitsTaken);
    const mercScore = this.getMercenaryScore(params.mercenaryKills);
    const accuracyScore = this.getAccuracyScore(params.shotsFired, params.shotsHit);

    return this.getGradeFromScore(hitsTakenScore + mercScore + accuracyScore);
  }

  // private

  getHitsTakenScore(hitsTaken) {
    if (hitsTaken === 0) {
      return 0;
    }
    if (hitsTaken <= 2) {
      return 5;
    }
    if (hitsTaken <= 6) {
      return 10;
    }
    if (hitsTaken <= 10) {
      return 15;
    }
    if (hitsTaken <= 15) {
      return 20;
    }

    return 25;
  }

  getMercenaryScore(mercenaryKills) {
    if (mercenaryKills === 0) {
      return 0;
    }
    if (mercenaryKills <= 3) {
      return 5;
    }

    return 10;
  }

  getAccuracyScore(shotsFired, shotsHit) {
    let accuracy = 0;
    if (shotsFired > 0) {
      accuracy = shotsHit / shotsFired;
    }

    if (accuracy === 1) {
      return 0;
    }
    if (accuracy >= 0.96) {
      return 1;
    }
    if (accuracy >= 0.92) {
      return 5;
    }
    if (accuracy >= 0.88) {
      return 10;
    }

    return 15;
  }

  getGradeFromScore(score) {
    if (score === 0) {
      return letterGrades.aPlus;
    }
    if (score < 10) {
      return letterGrades.a;
    }
    if (score < 20) {
      return letterGrades.b;
    }
    if (score < 30) {
      return letterGrades.c;
    }

    return letterGrades.d;
  }
}
