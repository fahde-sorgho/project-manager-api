const uuid = require('uuid');

let date = '2019-06-10T00:00:00.000+00:00';

module.exports = [
    {
        _id: uuid.v4(),
        sprints:
            [
                {
                    _id: uuid.v4(),
                    tasks: [
                        {
                            _id: uuid.v4(),
                            name: "Test task",
                            description: "Test task description",
                            status: "todo",
                            grade: 9,
                            startDate: date,
                            endDate: date,
                            created_at: date,
                            updated_at: date
                        }
                    ],
                    name: "Test sprint",
                    description: "The test description",
                    startDate: date,
                    endDate: date,
                    created_at: date,
                    updated_at: date
                },
                {
                    _id: uuid.v4(),
                    tasks: [],
                    name: "Test sprint 2",
                    description: "The test description 2",
                    startDate: date,
                    endDate: date,
                    created_at: date,
                    updated_at: date
                }
                ],
        team:[],
        name:"Test project",
        description:"The test description",
        startDate: date,
        endDate: date,
        created_at: date,
        updated_at: date,
        _v:6
    }
];