User.destroy_all
Day.destroy_all

user = User.create(name: 'Blythe')
day = Day.create(date: 'April 4, 2020')

day.observations << Observation.create(content: "Today was a good day.")
day.reflections << Reflection.create(content: "I would like to have more good days.")
user.days << day