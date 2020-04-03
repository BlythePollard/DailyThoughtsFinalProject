# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(name: 'Blythe')
day = Day.create(date: 'April 4, 2020')

day.observations << Observation.create(content: "Today was a good day.")
day.reflections << Reflection.create(content: "I would like to have more good days.")
user.days << day