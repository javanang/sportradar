const mockAxios = require('axios');
const liveFeedData = require('./feedLiveResponse');
const dailyScheduleData = require('./dailySchedule');
const api = require('../server/lib/api');

jest.mock('axios');
// mockAxios.getLiveFeed.mockResolvedValue({ data: liveFeedData });

describe('--NHL API methods--', () => {
  describe('--getDailySchedule--', () => {
    beforeAll(async () => {
      mockAxios.get.mockResolvedValue({ data: dailyScheduleData });
      dailySchedule = await api.getDailySchedule();
    });
    afterAll(() => {
      mockAxios.get.mockClear();
    });
    it('Should be defined', () => {
      expect(api.getDailySchedule).toBeDefined();
    });
    it('Should make one get request', () => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
    it('Should return an array of games', () => {
      expect(Array.isArray(dailySchedule)).toBe(true);
    });
    it('Should have objects with "gamePk" and "gameDate" keys', () => {
      expect(dailySchedule[0].gamePk).toBeDefined();
      expect(dailySchedule[0].gameDate).toBeDefined();
    });
  });
  describe('--getLiveFeed--', () => {
    beforeAll(async () => {
      mockAxios.get.mockResolvedValue({ data: liveFeedData });
      liveFeed = await api.getLiveFeed();
    });
    afterAll(() => {
      mockAxios.get.mockClear();
    });
    it('Should be defined', () => {
      expect(api.getLiveFeed).toBeDefined();
    });
    it('Should make one get request', () => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
    it('Should return an object', () => {
      expect(Array.isArray(liveFeed)).toBe(false);
      expect(typeof liveFeed).toBe('object');
    });
    it('Should be object with "gameData" and "liveData" keys', () => {
      expect(liveFeed.gameData).toBeDefined();
      expect(liveFeed.liveData).toBeDefined();
    });
  });
});