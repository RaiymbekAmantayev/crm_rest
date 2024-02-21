'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Добавление столбца departmentId
    await queryInterface.addColumn('grades', 'departmentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'departments', // Имя связанной таблицы
        key: 'id'             // Имя связанного столбца в таблице departments
      },
    });
  },
};

