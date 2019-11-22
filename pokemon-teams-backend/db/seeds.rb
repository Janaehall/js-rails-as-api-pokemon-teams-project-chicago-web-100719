require 'faker'
require 'securerandom'

Trainer.delete_all
Pokemon.delete_all

trainer_collection = []

10.times do 
  trainer_collection << Trainer.create(name: Faker::Name.first_name)
end

trainer_collection.each do |trainer|
  team_size = (SecureRandom.random_number(6) + 1.floor)

  (1..team_size).each do |poke|
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end
end