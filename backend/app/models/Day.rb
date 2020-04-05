class Day < ApplicationRecord
    #belongs_to :user
    has_many :observations
    has_many :reflections
end