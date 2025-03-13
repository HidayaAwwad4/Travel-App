const { calculateDuration } = require('../src/client/js/main');


describe('calculateDuration', () => {
  test('should calculate the correct duration between two dates', () => {
    const startDate = '2025-03-15';
    const endDate = '2025-03-18';
    const duration = calculateDuration(startDate, endDate);
    expect(duration).toBe(4);
  });

  test('should return 1 if start and end date are the same', () => {
    const startDate = '2025-03-15';
    const endDate = '2025-03-15';
    const duration = calculateDuration(startDate, endDate);
    expect(duration).toBe(1);
  });
});
