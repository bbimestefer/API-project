'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: '2023-07-12',
        endDate: '2023-07-19',
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2023-08-02',
        endDate: '2023-08-10',
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2023-11-23',
        endDate: '2023-11-27',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2023-07-12', '2023-08-02', '2023-11-23'] }
    }, {});
  }
};
