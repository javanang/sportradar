const dataTransform = require('../server/lib/data');
const liveFeedData = require('./feedLiveResponse');

describe('--Transform Data Methods--', () => {
  describe('--getPlayerStats--', () => {
    beforeAll(() => result = dataTransform.getPlayerStats(liveFeedData));
    it('Should return an array', () => {
      expect(Array.isArray(result)).toBe(true);
    });
    it('Should return an array of objects', () => {
      expect(typeof result[0]).toBe('object');
    });
    it('Should have an object with expected keys', () => {
      expect(Object.keys(result[0])).toEqual([
        'id',
        'assists',
        'goals',
        'hits',
        'points',
        'penaltyMinutes'
      ]);
    });
  });
  describe('--getStatus--', () => {
    beforeAll(() => result = dataTransform.getStatus(liveFeedData));
    it('Should return expected object shape', () => {
      expect(Object.keys(result)).toEqual(['gamePk', 'abstractGameState', 'codedGameState', 'detailedState', 'statusCode', 'startTimeTBD']);
    });
  });
  describe('--getPlayerInfo--', () => {
    beforeAll(() => result = dataTransform.getPlayerInfo(liveFeedData));
    it('Should return an array', () => {
      expect(Array.isArray(result)).toBe(true);
    });
    it('Should return an array of objects', () => {
      expect(typeof result[0]).toBe('object');
    });
    it('Should have an object with expected keys', () => {
      expect(Object.keys(result[0])).toEqual([
        'id',
        'fullName',
        'teamId',
        'teamName',
        'age',
        'primaryNumber',
        'primaryPosition',
        'gameId'
      ]);
    });
  });
})