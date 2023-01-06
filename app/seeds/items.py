from app.models import db, Item, environment, SCHEMA

def seed_items():
  item1 = Item(
    quantity = 500,
    name = 'Flowflex COVID-19 Antigen Home Test, 1ct. (4-Pack)',
    description = 'Flowflex COVID-19 Antigen Home Test (4-Pack) detects SARS-CoV-2 antigens in anterior nasal specimens. For self-testing use. FDA EUA authorized to test for active COVID-19 infection with or without symptoms.',
    price = 51.96,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw0dc0a717/images/large/flowflex-covid-19-antigen-home-test-1-ct-10132b-4pk.jpg?sw=900'
  )
  item2 = Item(
    quantity = 100,
    name = '23andMe Health Service',
    description = '23andMe Health Service is an at home saliva testing kit that provides personalized genetic insights that can help you take more informed actions on your health, today and in the future',
    price = 139.00,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dwf7a3d7ce/images/large/32162-FSA-Store-23andme-BadgeREV.jpg?sw=900'
  )
  item3 = Item(
    quantity = 100,
    name = 'Braun No Touch + Forehead Thermometer',
    description = 'The Braun No Touch + Forehead Thermometer gives fast, precise temperature readings in touch mode and no-touch mode (up to 2 in away from the forehead). Its large display and color coded reading make it easy to interpret.',
    price = 89.00,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw1756d2f1/images/large/braun-no-touch-forehead-thermometer-24143-1.jpg?sw=900'
  )
  item4 = Item(
    quantity = 300,
    name = 'Band-Aid Baby Shark Assorted Bandages, 20 ct.',
    description = "Care for your child's minor wounds and bring a smile to their face with Pinkfong Baby Shark Band-Aid Brand Adhesive Bandages.",
    price = 4.29,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dwf0deae33/images/large/700539_7.jpg?sw=900'
  )
  item5 = Item(
    quantity = 50,
    name = 'Zyrtec Allergy Chewable Tablet, 24 ct.',
    description = "Get 24-hour hay fever and both indoor and outdoor allergy relief that works fast and stays strong with Zyrtec Allergy Dye-Free Chewables.",
    price = 24.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dwadc0cd1b/images/large/40170-1.jpg?sw=900'
  )
  item6 = Item(
    quantity = 100,
    name = 'Theraflu Night Time Severe Cold & Cough Powder, Honey Lemon Infused with White Tea and Chamomile, 6 ct.',
    description = "The Theraflu Nighttime Severe Cold & Cough Powder provides relief for cold and flu symptoms with the taste of honey lemon, white tea, and chamomile.",
    price = 10.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw0de651f3/images/large/theraflu-night-time-severe-cold-cough-6-ct-29298-1.jpg?sw=900'
  )
  item7 = Item(
    quantity = 80,
    name = 'Omron 10 SERIES Advanced Accuracy Upper Arm Blood Pressure Monitor',
    description = "The OMRON 10 Series Wireless Upper Arm home blood pressure monitor measures five times more data points for consistent, precise readings.",
    price = 109.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw701d0819/images/large/omron-10-series-advanced-accuracy-upper-arm-blood-pressure-monitor-27590-6.jpg?sw=900'
  )
  item8 = Item(
    quantity = 15,
    name = 'Aura Revive Heated Deep Muscle Pain Relief Device',
    description = "The Aura Revive Heated Deep Muscle Pain Relief Device is the tool you need and the pain reliever you deserve. This state-of-the-art heated pain relief device uses heat+ percussion to target and heal pain points",
    price = 199.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw99bc0c35/images/large/aura-revive-deep-muscle-and-joint-pain-relieving-massage-gun-with-heat-therapy-30090-1-Dot-Whack.jpg?sw=900'
  )
  item9 = Item(
    quantity = 55,
    name = 'Aura Sleek Callus, Corn and Ingrown Toe Nail Remover',
    description = "Aura Sleek is a podiatry tool designed for home use. Treat Ingrown toenails, calluses, and corns and achieve flawless results in the comfort of your own home.",
    price = 169.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw1480a0c4/images/large/aura-sleek-callus-corn-and-ingrown-toe-nail-remover-_004.jpg?sw=900'
  )
  item10 = Item(
    quantity = 300,
    name = 'Neutrogena Pink Grapefruit Oil-Free Cleansing Wipes - 25 ct.',
    description = "Clean and refresh acne-prone skin quickly and easily with Neutrogena Oil-Free Cleansing Wipes",
    price = 9.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw7c4004ce/images/large/neutrogena-pink-grapefruit-oil-free-cleansing-wipes-25ct-28469-1.jpg?sw=900'
  )
  item11 = Item(
    quantity = 120,
    name = 'CeraVe Renewing SA Cleanser, 8 oz.',
    description = "The CeraVe Renewing Salicylic Acid Cleanser, 8 oz. exfoliates and detoxifies to remove dirt and oil while softening and smoothing skin.",
    price = 14.99,
    image = 'https://target.scene7.com/is/image/Target/GUEST_c45f5ab3-046b-45b9-bdcc-6dea0c911280?wid=325&hei=325&qlt=80&fmt=pjpeg'
  )
  item12 = Item(
    quantity = 230,
    name = 'Blistex Medicated Lip Ointment, .35 oz.',
    description = "Blistex Medicated Lip Ointment features an advanced moisture system that delivers penetrating medication in a unique formula to relieve cold sores and severe lip dryness.",
    price = 3.99,
    image = 'https://target.scene7.com/is/image/Target/GUEST_bc0ea18a-3bcb-4508-a2ec-6a928c1742ab?wid=325&hei=325&qlt=80&fmt=pjpeg'
  )
  item13 = Item(
    quantity = 250,
    name = 'Monthly Menstrual Essentials Bundle',
    description = "Take menstrual care to new levels of comfort with our Monthly Menstrual Essentials. With this carefully curated bundle, you will get what you need to keep you going any time of the month. And there from today's top brands so you know you can trust you will get the care you deserve.",
    price = 69.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw19745ab7/images/large/Monthly-Menstrual-Essentials_10215b.jpg?sw=900'
  )
  item14 = Item(
    quantity = 150,
    name = 'Pepcid AC Acid Reducer Maximum Strength Tablets, 75 ct.',
    description = "Pepcid AC Acid Reducer Maximum Strength tablets provide fast-acting prevention and relief of heartburn associated with acid indigestion and sour stomach.",
    price = 35.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw295341eb/images/large/pepcid-ac-acid-reducer-maximum-strength-tablets-75-ct-30886-1.jpg?sw=900'
  )
  item15 = Item(
    quantity = 500,
    name = 'U by Kotex Click Compact Tampons, Super Absorbency',
    description = "Conquer your flow one day at a time with U by Kotex Security Super Tampons featuring a smooth applicator for easy, comfortable insertion.",
    price = 10.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw3ef1826d/images/large/u-by-kotex-security-tampons-super-absorbency-unscented-32-count-28263m_1.jpg?sw=900'
  )
  item16 = Item(
    quantity = 30,
    name = 'Arthritis, Joint, and Muscle Bundle',
    description = "Fight both chronic & acute pain with this curated bundle that will help you get back on your feet with a variety of holistic pain management products or medicated liquid gels that help alleviate pain quickly and effectively.",
    price = 247.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw699d27d8/images/large/product-set-allergy-arthritis-joint-muscle-relief%20-10145b%20-opt2.jpg?sw=900'
  )
  item17 = Item(
    quantity = 300,
    name = 'GoodSense® Omeprazole Delayed Release Tablets 20 mg, Acid Reducer, 42 ct.',
    description = "GoodSense® Omeprazole Delayed Release Tablets 20 mg, Acid Reducer, treats frequent heartburn that occurs 2 or more times a week. Omeprazole is a Proton Pump Inhibitor (PPI) that deactivates pumps in the stomach lining to inhibit acid production at the source. Take your health to the next level with FSA eligible Digestive Health products.",
    price = 29.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw4a552d58/images/large/goodsense-omeprazole-delayed-release-tablets-20-mg-acid-reducer-42-ct-29022m-1.jpg?sw=900'
  )
  item18 = Item(
    quantity = 100,
    name = 'First Response Early Result Pregnancy Test - 2 ct. (2-Pack)',
    description = "First Response Early Result Pregnancy Test - 2 ct. (2-Pack) can now detect the pregnancy hormone, hCG, 6 days before your missed period. With First to Detect Technology, only First Response Test captures scant amounts of pregnancy hormones—6 days before your missed period, no other test can do that.",
    price = 29.98,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw8879115a/images/large/first-response-early-result-pregnancy-test-2ct-10171b.jpg?sw=900'
  )
  item19 = Item(
    quantity = 75,
    name = 'Bayer Contour Next Blood Glucose Test Strip - 70 ct. (2-Pack)',
    description = "Bayer Contour Next Blood Glucose Test Strip - 70 ct. (2-Pack), No Coding® technology means one less step in testing and eliminates errors due to user miscoding. Second-Chance® sampling allows you to apply more blood which may help prevent wasting test strips and save money.",
    price = 91.98,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw98f0e333/images/large/bayer-contour-next-blood-glucose-test-strip-70-count-10164b.jpg?sw=900'
  )
  item20 = Item(
    quantity = 100,
    name = 'OneTouch Verio Reflect Blood Glucose Monitoring System',
    description = "Use OneTouch Verio Reflect blood glucose monitor kit for accurate blood glucose readings.",
    price = 49.99,
    image = 'https://fsastore.com/dw/image/v2/BFKW_PRD/on/demandware.static/-/Sites-hec-master/default/dw2fa8fbe8/images/large/onetouch-verio-reflect-system-mg-us-30166-1.jpg?sw=900'
  )

  
  db.session.add(item1)
  db.session.add(item2)
  db.session.add(item3)
  db.session.add(item4)
  db.session.add(item5)
  db.session.add(item6)
  db.session.add(item7)
  db.session.add(item8)
  db.session.add(item9)
  db.session.add(item10)
  db.session.add(item11)
  db.session.add(item12)
  db.session.add(item13)
  db.session.add(item14)
  db.session.add(item15)
  db.session.add(item16)
  db.session.add(item17)
  db.session.add(item18)
  db.session.add(item19)
  db.session.add(item20)
  db.session.commit()

def undo_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM items")
        
    db.session.commit()