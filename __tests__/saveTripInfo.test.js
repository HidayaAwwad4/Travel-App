const { saveTripInfo } = require('../src/client/js/main');


beforeEach(() => {
  localStorage.clear();
});

describe('saveTripInfo', () => {
  test('should save a trip to localStorage', () => {
    const tripInfo = {
      city: 'Paris',
      country: 'France',
      startDate: '2025-03-15',
      endDate: '2025-03-18',
      duration: 4,
      hotel: 'Hotel Paris',
      weather: 'Sunny',
      image: 'paris.jpg'
    };

    saveTripInfo(tripInfo);
    const savedTrips = JSON.parse(localStorage.getItem('trips'));
    
    expect(savedTrips).toHaveLength(1);
    expect(savedTrips[0]).toEqual(tripInfo);
  });

  test('should append a new trip without overwriting existing trips', () => {
    const firstTrip = { city: 'Paris', startDate: '2025-03-15', endDate: '2025-03-18' };
    const secondTrip = { city: 'Rome', startDate: '2025-04-01', endDate: '2025-04-05' };

    saveTripInfo(firstTrip);
    saveTripInfo(secondTrip);

    const savedTrips = JSON.parse(localStorage.getItem('trips'));

    expect(savedTrips).toHaveLength(2);
    expect(savedTrips[1]).toEqual(secondTrip);
  });
});
