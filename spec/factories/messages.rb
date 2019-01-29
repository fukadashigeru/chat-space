FactoryBot.define do
  factory :message do
    content Faker::Lorem.sentence
    # image File.open("#{Rails.root}/public/uploads/message/image/8/スクリーンショット_2019-01-15_19.52.04.png")
    user
    group
  end
end
