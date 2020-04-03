class User < ApplicationRecord
    has_many :days
    has_many :observations, through: :days
    has_many :reflections, through: :days
end