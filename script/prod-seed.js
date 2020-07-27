'use strict'

const db = require('../server/db')

const {Category, Product} = require('../server/db/models')

const prodData = [
  {
    categoryId: 7,
    name: 'TP',
    description: 'Because you can never have enough',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwmDMOOx13_zPmrcQIZ8IuhHPSvb4rLbb3yf1pSbskqVt2dLsUJuZ9TJj5KxkX9Cx_Opjg7igD&usqp=CAc',
    price: 1.99,
    inventory: 0
  },
  {
    categoryId: 7,
    name: 'TP (Free Diamond Gift)',
    description:
      'Propose to your quarantine partner with a roll of TP. Yes guaranteed.',
    imageUrl:
      'https://www.professionaljeweller.com/wp-content/uploads/2020/03/toilet-roll-promotion.jpg',
    price: 3999.99,
    inventory: 1000
  },
  {
    categoryId: 6,
    name: '985k Silver TP Earrings',
    description:
      'Elegant toilet paper roll earrings made with non-other than rolled paper strip (quilling) to imitate real-life toilet roll. Don’t worry, they’re special thick paper materials and are strong and hard.',
    imageUrl:
      'https://i.pinimg.com/originals/7b/91/e9/7b91e970d0eb729c69e7a7c908db8527.jpg',
    price: 56,
    inventory: 1000
  },
  {
    categoryId: 7,
    name: 'TP seeds',
    description:
      'A scientific breakthrough will fundamentally change the bathroom industry forever and save consumers from toilet paper hoarders worldwide.',
    imageUrl:
      'https://cdn.trendhunterstatic.com/thumbs/toilet-paper-prank.jpeg',
    price: 9.99,
    inventory: 100
  },
  {
    categoryId: 7,
    name: 'Organic Bamboo TP',
    description: "I don't know why it matters but apparently it's a thing",
    imageUrl:
      'https://images.asianproducts.com/images/pbimage/0/P15054427125828698b.jpg',
    price: 3.99,
    inventory: 1000
  },
  {
    categoryId: 3,
    name: 'Secret Recipe Lysol Substitute',
    description:
      'Apparently the time when lysol is available and affordable is over so be real and just use our secret recipe lysol substitute',
    imageUrl:
      'https://www.qosmedix.com/content/images/thumbs/0007264_powder-spray-bottle-with-locking-nozzle-clear.jpeg',
    price: 11.99,
    inventory: 1000
  },
  {
    categoryId: 3,
    name: 'Human Bubble',
    description: 'The ultimate protection against germy germs',
    imageUrl:
      'https://dazzlemaui.com/wp-content/uploads/maui-bubble-performer.jpg',
    price: 50,
    inventory: 100
  },
  {
    categoryId: 3,
    name: 'Hazmat Suit',
    description: 'The super-ultimate protection against germy germs',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwgcgxvGbT-PmANvLBYdMPBzmwReoyueWGdfPKdDTQPhOue2yWcA&usqp=CAc',
    price: 129.99,
    inventory: 100
  },
  {
    categoryId: 7,
    name: 'Roomba Friend',
    description:
      'The Roomba® i7 robot vacuum uses a premium 3-Stage Cleaning System and Dual Rubber Brushes giving you total control to clean when, and where you want.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5-YB7Xv7Jbm1dlReb15kHszE7WYKaTdagHzVx3mvaRh9VIRF-&usqp=CAU',
    price: 225,
    inventory: 75
  },
  {
    categoryId: 6,
    name: 'Wine',
    description:
      'The nose presents aromas of black currants, blackberries, and licorice with smooth, elegant cedar notes. The palate is very rich and generous yet fresh and vibrant at the same time.',
    imageUrl:
      'https://api.time.com/wp-content/uploads/2015/05/pouring-red-wine.jpg?quality=85&w=367&h=467&crop=1',
    price: 35,
    inventory: 3000
  },
  {
    categoryId: 6,
    name: 'VEUVE CLICQUOT YELLOW LABEL BRUT CHAMPAGNE',
    description:
      'Complex aromas of bright and beautiful ripe fruit, poached pear, grated ginger, and light cream. Excellent depth and persistence.',
    imageUrl:
      'https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/h17/h1e/12140654362654.png',
    price: 55,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Rosé- OREE DES ROSES',
    description:
      'This pleasant Rose has aromas of red fruit, such as ripe raspberries, wild strawberries, and a reflection of tropical fruit. It is round and delicious on the palate and makes an ideal aperitif.',
    imageUrl:
      'https://static.vinepair.com/wp-content/uploads/2019/05/rose9.png',
    price: 30,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Whiskey',
    description:
      'Maple charcoal filtered for a mellow, smooth flavor. Oak aged for an easy sweetness and a great, strong whiskey character.',
    imageUrl:
      'https://images.crateandbarrel.com/is/image/Crate/cb_dLP_20190425_FDHatchSet/?$web_zoom$&190425161323&wid=450&hei=450',
    price: 88,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Rum',
    description:
      'This clear rum has a rich and a full-bodied yet mellow taste. The finish is clean and balanced, making it the perfect rum for all types of mixing.',
    imageUrl:
      'https://www.thespruceeats.com/thmb/wx9jssvzbhO2heUvar0PVtX9hHs=/1765x1324/smart/filters:no_upscale()/Pyrat-XOReserve-Rum-587e0cea5f9b584db395ba5c.jpg',
    price: 35,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Vodka',
    description:
      'Elegant and silky smooth, this winter wheat vodka gets its water from the Gensac spring located in the Cognac region of France.',
    imageUrl:
      'https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/hde/hc4/12343358685214.png',
    price: 45,
    inventory: 200
  },
  {
    categoryId: 6,
    name: 'Soju',
    description:
      'A milder version to the original, made with the natural sweetener from Finland and a cleaner and refreshing taste.',
    imageUrl: 'https://www.astorwines.com/images/items/21765.jpg',
    price: 15,
    inventory: 200
  },
  {
    categoryId: 6,
    name: 'Sake',
    description:
      'Fresh and well structured, with subtle notes of pear and Fuji apple. Creamy mouthfeel.',
    imageUrl:
      'https://www.totalwine.com/dynamic/x1000,sq/media/sys_master/twmmedia/h27/h79/12217775194142.png',
    price: 25,
    inventory: 200
  },
  {
    categoryId: 3,
    name: 'COVID-19 Antibody Test',
    description: "Check if you've got the antibodies! A whopping 50% accuracy!",
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8VteLxXxr0yXeNpGjdbbsri3cdmo6zg8rRrVjTCv4VEZI-2Dp&usqp=CAU',
    price: 122.5,
    inventory: 400
  },
  {
    categoryId: 5,
    name: 'Blowhorn',
    description:
      'Rock the daily clap and make some noise for our frontline workers!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCcUDWY0eqeuaMZKTzviBNj7XbpS7hi1ELehdGGXmlv9DI2YHeftfJ8Ulzg5YVbVzaflp1UKI&usqp=CAc',
    price: 38,
    inventory: 200
  },
  {
    categoryId: 6,
    name: 'Rosey from The Jetsons',
    description:
      'Trying to juggle working from home and kids?  Our robot nanny, Rosey, can help!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzC5Cuiw95YIrj_vou08YOGNIUMrqE1tT5dcN28x03pH5SHXxv&usqp=CAU',
    price: 20,
    inventory: 150
  },
  {
    categoryId: 2,
    name: 'Sourdough Starter',
    description:
      'The perfect way to experience medieval childbirth. Success not guaranteed though!',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVRX6qDwPa4mDjUuicm_IFvi-JQyC8A14yilMbIDAXzFfpvJj2&usqp=CAU',
    price: 20,
    inventory: 100
  },
  {
    categoryId: 2,
    name: 'Stale Bread',
    description:
      "Because you want to make French Toast but you don't have any leftover bread.",
    imageUrl:
      'https://img1.jamieoliver.com/jamieoliver/home/wp-content/uploads/2020/03/stalebreadHEADER_630x420.jpg',
    price: 20,
    inventory: 100
  },
  {
    categoryId: 7,
    name: 'Fertilizer',
    description: 'Your plants grow better with worm power!',
    imageUrl:
      'https://www.gardeners.com/dw/image/v2/AABF_PRD/on/demandware.static/-/Sites-GSC_Products/default/dw30979934/Products/8599281_11529_fort-vee-soil-mix-for-fruiting-and-flowering-plants.jpg?sw=840&sh=1120&sm=fit&SC=XNET0350',
    price: 15,
    inventory: 200
  },
  {
    categoryId: 2,
    name: 'Mac and Cheese',
    description: 'You know mac and cheese is the only way to comfort your soul',
    imageUrl:
      'https://simpleveganblog.com/wp-content/uploads/2019/12/Vegan-Mac-and-Cheese-3.jpg',
    price: 5,
    inventory: 500
  },
  {
    categoryId: 5,
    name: '3D Game of Throne Puzzle',
    description:
      'Because the last season of GOT sucks and you need to do it your way',
    imageUrl:
      'https://cdn11.bigcommerce.com/s-do0ookap9x/images/stencil/1280x1280/products/20680/26942/42809_main__44580.1541552273.jpg?c=2&imbypass=on&imbypass=on',
    price: 200,
    inventory: 150
  },
  {
    categoryId: 3,
    name: 'Batman Costume',
    description:
      "It's better to have it when you need it, if ever. \nA statement piece to show that you are not scared of the virus!",
    imageUrl:
      'https://mypoppet.com.au/makes/mp-content/uploads/2011/10/bat-wings-finished_mask.jpg',
    price: 50,
    inventory: 50
  },
  {
    categoryId: 3,
    name: 'Dinasour Costume',
    description:
      "Tyrannosaurus inflatable gets you all the attention you don't want",
    imageUrl:
      'https://contestimg.wish.com/api/webimage/5e060039dc1ddb08d7b9d1a2-large.jpg?cache_buster=26e38a9cd22620bc9b20f8834984249e',
    price: 90,
    inventory: 300
  },
  {
    categoryId: 3,
    name: 'Clown Costume',
    description:
      'Perfect when your family is tired of you being around all the time',
    imageUrl:
      'https://i5.wal.co/asr/ee6801f3-90ed-45cd-bf87-d1b064aa847e_1.00150be1c2536236afb4274052fcb7d8.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
    price: 50,
    inventory: 50
  },
  {
    categoryId: 5,
    name: 'Ouija Board',
    description: "So you can ask the sipirit world what's going on with 2020",
    imageUrl:
      'https://cdn.mos.cms.futurecdn.net/4pReBLNFJpm8QkqBXuWeYC-320-80.jpg',
    price: 51,
    inventory: 50
  },
  {
    categoryId: 3,
    name: 'Face Masks',
    description:
      'They might not protect you from infection but they do make your skin silky smooth!',
    imageUrl:
      'https://rlv.zcache.com/red_lips_mouth_lipstick_woman_for_her_funny_cloth_face_mask-re7308127c0e2421e99e738812e6706d0_t4uz9_704.jpg?rlvnet=1',
    price: 5,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Wig - long hair',
    description: 'Stay presentable even though you DESPERATELY need a haircut',
    imageUrl:
      'https://i.pinimg.com/474x/50/86/90/508690cd40fd0fe10cb71c17fcf52b59.jpg',
    price: 600,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Wig - short hair',
    description: 'Stay presentable even though you DESPERATELY need a haircut',
    imageUrl:
      'https://www.pngitem.com/pimgs/m/509-5098119_wig-vector-bob-hair-short-hair-styles-png.png',
    price: 500,
    inventory: 500
  },
  {
    categoryId: 7,
    name: 'Indoor Sun Lamp',
    description: 'Get your sun inside so you never have to leave your home',
    imageUrl:
      'https://cdn.zmescience.com/wp-content/uploads/2015/03/light-bring-to-market.jpg',
    price: 800,
    inventory: 500
  },
  {
    categoryId: 4,
    name: 'Growth Light',
    description:
      "Because you need to figure out how to grow vegetables so you don't starve to death",
    imageUrl:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2019%2F07%2F12165643%2Fgrow-light-pendant-0719.jpg',
    price: 219,
    inventory: 50
  },
  {
    categoryId: 4,
    name: 'Bronze Growth House',
    description:
      'Modern Sprout makes gardening easier. Create green combinations that will thrive in low-light spaces with this Growhouse. It frames your favorite plantscape and nourishes it with all-over grow lights, giving your space personality while allowing your favorite plants to thrive.',
    imageUrl:
      'https://assets.weimgs.com/weimgs/rk/images/wcm/products/202023/0003/img21o.jpg',
    price: 198,
    inventory: 500
  },
  {
    categoryId: 4,
    name: 'Herb Growing Kit',
    description:
      'Starting an HERB garden is easy and fun! There’s nothing better than having fresh HERBS right at your fingertips, ready for use.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/71GYmXS60qL._AC_SY450_.jpg',
    price: 75,
    inventory: 500
  },
  {
    categoryId: 3,
    name: 'UV Sanitizing Light',
    description:
      'A desperate need for sanitizers has driven people to look for options beyond the spray nozzle.',
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQPOe1AblfRsUTrMQwAMLS9gD7p0FJFoZJCsYU2X0FMlLWAoIVloXx0I50IJWH5iC1OYEr6icLD&usqp=CAc',
    price: 320,
    inventory: 50
  },
  {
    categoryId: 6,
    name: 'Plants',
    description:
      "The best listener to all your problems, especially if you're quarantining alone",
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/EChI56lylLEg9-9ROH0VFK8q8j4=/0x0:1872x1248/1200x800/filters:focal(779x575:1077x873)/cdn.vox-cdn.com/uploads/chorus_image/image/60064425/House_Calls_Wayne_Jamieson_Heidis_Bridge_plants_Heisis_Bridge.0.jpg',
    price: 200,
    inventory: 200
  },
  {
    categoryId: 1,
    name: 'Alien',
    description: "Great company since we hear they can't transmit COVID",
    imageUrl: 'https://www.dw.com/image/50460750_303.jpg',
    price: 5000,
    inventory: 100
  },
  {
    categoryId: 1,
    name: 'Litter of puppies',
    description: 'You need the priceless snuggles',
    imageUrl:
      'https://adesignerportraits.com/wp-content/uploads/2017/08/A-litter-of-eight-adorable-Golden-Retriever-puppies.jpg',
    price: 50000,
    inventory: 50
  },
  {
    categoryId: 5,
    name: 'Cards Against Humanity',
    description:
      'Not sure if we are legally allowed to sell these, but this game is super entertaining. We do not accept any liability.',
    imageUrl:
      'https://thebigbox.co.za/wp-content/uploads/2018/03/Cards-Against-Humanity-Blue-Expansion-400x400.jpg',
    price: 40,
    inventory: 400
  },
  {
    categoryId: 5,
    name: 'Beach Kit',
    description:
      "Bring the beach to you! Even though the beach is probably safe, we know you don't want to have to leave your home. Plus unless you have a car, you probably have no way to get there.",
    imageUrl:
      'https://ii3.worldmarket.com/fcgi-bin/iipsrv.fcgi?FIF=/images/worldmarket/source/35058_XXX_v1.tif&wid=650&cvt=jpeg',
    price: 60,
    inventory: 500
  },
  {
    categoryId: 1,
    name: 'Plushies',
    description:
      'Each of these Plush Vivacious Vegetables is ready to be cuddled by an adoring kid or toddler. Alone or mixed in a gregarious bunch on a bedspread or shelf, the veggies, crafted by the London-based brand Jellycat, make suitable companions for babies from birth.',
    imageUrl:
      'https://store.moma.org/dw/image/v2/BBQC_PRD/on/demandware.static/-/Sites-master-moma/default/dwa3db3f3f/images/149576_a.jpg?sw=1252&sh=1252&sm=cut',
    price: 12,
    inventory: 300
  },
  {
    categoryId: 3,
    name: 'Batman Mask',
    description:
      "This won't protect you against infection but you will look AWESOME",
    imageUrl:
      'https://cdn.costumemascotworld.com/media/-/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/1/0/10029.jpg?sig=06eaadfd3d619b50bcff30ea34351748&p=dz02NTAmcmE9MCZycz0xJndzPSZ3cD1zdHJldGNoJndvPSZwPTgwNTMmcT05MCZjbz0xJmFyPTEma2Y9MA==',
    price: 13,
    inventory: 400
  },
  {
    categoryId: 2,
    name: 'Calming Gummie Frogs',
    description:
      'These frogs are anti-inflammatory and the best way to deal with anxiety',
    imageUrl:
      'https://cdn.directcbdonline.com/wp-content/uploads/2018/08/foggies200mg-600x600.jpg',
    price: 20,
    inventory: 200
  },
  {
    categoryId: 2,
    name: "Leftover from Grandma's House",
    description: "Nothing beats grandma's leftover lasagna",
    imageUrl:
      'https://hips.hearstapps.com/vidthumb/images/180820-bookazine-delish-01280-1536610916.jpg?crop=1.00xw:0.752xh;0,0.250xh&resize=1200:*',
    price: 50,
    inventory: 2
  },
  {
    categoryId: 5,
    name: 'Fireworks',
    description:
      'Just in case quarantine ever ends so you have something to annoy your neighbors with',
    imageUrl:
      'https://i.etsystatic.com/17857814/r/il/77193f/1762824066/il_1588xN.1762824066_q9d3.jpg',
    price: 50,
    inventory: 500
  },
  {
    categoryId: 1,
    name: 'Inflatable Cat',
    description: 'For these sad humans who are unfortunately allergic to cats',
    imageUrl:
      'https://media1.popsugar-assets.com/files/thumbor/OgAj6Tzl-sj_tnRfGflZC1ejaDI/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2019/05/15/673/n/24155406/b65e87d5922bd8ea_GUEST_6f6aac1c-be82-4320-9d0b-f5b4644513b8/i/Target-Sun-Squad-Mermaid-Cat-Pool-Float.jpeg',
    price: 30,
    inventory: 300
  },
  {
    categoryId: 5,
    name: 'Giant Pink Flamingo Inflatable',
    description: 'So your kids and your pets can have fun in the bathtub',
    imageUrl:
      'https://slimages.macysassets.com/is/image/MCY/products/6/optimized/13667286_fpx.tif?op_sharpen=1&wid=500&hei=613&fit=fit,1&$filtersm$',
    price: 30,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Dinasour Bag',
    description: 'Run to your lakehouse in style',
    imageUrl:
      'https://target.scene7.com/is/image/Target/GUEST_9519c309-cd8b-4b58-a9ec-ee08151e2d4c?wid=488&hei=488&fmt=pjpeg',
    price: 50,
    inventory: 300
  },
  {
    categoryId: 5,
    name: 'Watermelon Inflatable',
    description: 'Float in your pool feeling like a watermelon',
    imageUrl:
      'https://s7.orientaltrading.com/is/image/OrientalTrading/PDP_VIEWER_IMAGE/giant-inflatable-bigmouth-sup----sup-watermelon-pool-float~13791469',
    price: 50,
    inventory: 50
  },
  {
    categoryId: 4,
    name: 'Lemon Tree',
    description:
      'Lemons as bright as summer sunshine make your home fresh for the season with the feeling of warm Mediterranean afternoons.',
    imageUrl:
      'https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202009/2490/img25o.jpg',
    price: 300,
    inventory: 100
  },
  {
    categoryId: 6,
    name: 'Vintage Wine Opener',
    description:
      'Modeled after a vintage professional wine opener we saw at a vineyard, our tabletop version securely holds a wine bottle in place for uncorking.',
    imageUrl:
      'https://assets.pbimgs.com/pbimgs/ab/images/dp/wcm/202009/0583/vintners-standing-wine-opener-o.jpg',
    price: 300,
    inventory: 300
  },
  {
    categoryId: 6,
    name: 'Dry Shampoo',
    description: 'For when shower feels like a chore',
    imageUrl:
      'https://hollyrose.eco/wp-content/uploads/2020/02/ALDER252BNEW252BYORK252B253F252BBERGAMOT252BNATURAL252BHAIR252BPOWDER.jpg',
    price: 15,
    inventory: 1000
  },
  {
    categoryId: 1,
    name: 'Rubber Duck',
    description: 'Debug with a friend',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Yellow_Duck.jpg/256px-Yellow_Duck.jpg',
    price: 10,
    inventory: 1000
  },
  {
    categoryId: 1,
    name: 'Megaphone',
    description: 'A new way to communicate with your best friend from afar',
    imageUrl:
      'https://imgaz1.staticbg.com/thumb/large/oaupload/ser1/banggood/images/21/07/9474ae00-56ad-43ba-9bf1-97c7e80d34ee.jpg',
    price: 200,
    inventory: 50
  },
  {
    categoryId: 6,
    name: 'Manicure Kit',
    description:
      'Self-love comes in mani forms. Take some time to nurture yourself and your nails with our exclusive, limited-edition Zeba collab. Inside you’ll find 7 new must-paint polish colors and our 8-piece mani system of tools and products',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/2665/7478/products/1_R1_720x.jpg?v=1589722855',
    price: 88,
    inventory: 100
  },
  {
    categoryId: 2,
    name: 'Corona Beer',
    description: 'Any publicity is good publicity, right?',
    imageUrl:
      'https://s3-eu-central-1.amazonaws.com/centaur-wp/marketingweek/prod/content/uploads/2020/03/03101912/shutterstock_1198144933-750x500.jpg',
    price: 9,
    inventory: 1000
  },
  {
    categoryId: 6,
    name: 'Peleton',
    description: 'So you stay in shape during quarantine',
    imageUrl:
      'https://cyclingindustry.news/wp-content/uploads/2019/11/peleton.jpg',
    price: 3125,
    inventory: 3000
  },
  {
    categoryId: 4,
    name: 'Living Composter',
    description:
      'Designed scientifically, this odorless, biomorphic composter turns food scraps into fab fertilizer.',
    imageUrl:
      'https://www.uncommongoods.com/images/items/47100/47184_1_640px.jpg',
    price: 299,
    inventory: 200
  },
  {
    categoryId: 7,
    name: 'Art Deco Sheep TP Holder',
    description: 'The most luxurious art deco item you can ever own',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51D7UWjAsfL._AC_SL1000_.jpg',
    price: 25,
    inventory: 2000
  },
  {
    categoryId: 4,
    name: 'Tricyle',
    description:
      "Because MTA is not an option anymore and you realize you don't know how to ride a bicycle",
    imageUrl:
      'https://www.radioflyer.com/media/catalog/product/3/4/34b-feature-1_1.jpg',
    price: 300,
    inventory: 200
  },
  {
    categoryId: 1,
    name: 'Invitation to the most pawsome party',
    description: "Because you can't stop screaming at them",
    imageUrl:
      'https://images.squarespace-cdn.com/content/v1/582eef516a496375f0362a12/1481861607523-FENRS5UMF3GE5WXXV7WL/ke17ZwdGBToddI8pDm48kBtpJ0h6oTA_T7DonTC8zFdZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIWkiAYz5ghgEgSGJuDQ4e1ZKXpRdhEMT7SgthRpD0vyIKMshLAGzx4R3EDFOm1kBS/Bone+Shaped+Dog+Pool.jpg',
    price: 500,
    inventory: 20
  },
  {
    categoryId: 1,
    name: 'Videochat with Alpacas',
    description:
      'You get to have a monologue with the funniest faces in the world and not risk getting spitted on',
    imageUrl:
      'https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/97043/153133/181243-1024__58273.1575352881.jpg?c=2?imbypass=on',
    price: 500,
    inventory: 20
  },
  {
    categoryId: 1,
    name: 'Couple Therapy',
    description:
      "Just in case you and your partner can't decide who is going to take the trash down",
    imageUrl:
      'https://static01.nyt.com/images/2013/03/26/science/26CONS_SPAN/26CONS-superJumbo.jpg',
    price: 800,
    inventory: 20
  },
  {
    categoryId: 7,
    name: 'Pet Mask',
    description: 'Because your pet needs protection as well',
    imageUrl:
      'https://thumbs.dreamstime.com/b/closeup-portrait-ginger-cat-wearing-sunglasses-protective-medical-mask-isolated-light-cyan-closeup-portrait-ginger-181497163.jpg',
    price: 5,
    inventory: 500
  },
  {
    categoryId: 7,
    name: 'Bubble Carrier for Pet',
    description: 'Go to the vet with protection',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0394/6125/products/51ztGECeEKL_600x.jpg?v=1496228789',
    price: 62,
    inventory: 300
  },
  {
    categoryId: 2,
    name: 'Canned Foie Gras',
    description: 'So you can actually enjoy eating canned food',
    imageUrl:
      'https://i.pinimg.com/originals/5a/c4/99/5ac499d997d33a42702df5db9826635b.jpg',
    price: 39,
    inventory: 300
  },
  {
    categoryId: 6,
    name: 'WFH Survival Kit',
    description:
      'Trying to navigate working at home? Be productive with the new Work From Home Survival Kit by Pinch Provisions. This kit comes with 9 essentials to help you stay on task, including a webcam cover, conference call bingo card, desk yoga guide, fidget cube, and earplugs.',
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0424/3433/products/work-from-home-mugshot_1025x.jpg?v=1585257486',
    price: 29,
    inventory: 500
  },
  {
    categoryId: 4,
    name: 'Spark Joy',
    description:
      'All of sudden you have to master the life-changing magic of tidying up because your wife said so.',
    imageUrl:
      'https://www.containerstore.com/catalogimages/361092/10068298SparkJoy.jpg?width=1200&height=1200&align=center',
    price: 18,
    inventory: 500
  },
  {
    categoryId: 2,
    name: 'Canneles',
    description:
      "These sweets made with rum will clam you down because that's exactly what sugar and alcohol can do",
    imageUrl:
      'https://www.petitfute.com/medias/professionnel/1458340/premium/600_450/3a54de30b414e2ce5db1e1960ed0f1cd_la-toque-cuivree-canneles-de_la-toque-cuivree.jpg',
    price: 40,
    inventory: 50
  },
  {
    categoryId: 2,
    name: 'Pasteis de nata',
    description: 'Transport yourself to Lisbon in one bite',
    imageUrl:
      'https://716f24d81edeb11608aa-99aa5ccfecf745e7cf976b37d172ce54.ssl.cf1.rackcdn.com/portuguese-egg-tarts-2175867l1.jpg',
    price: 6,
    inventory: 500
  },
  {
    categoryId: 2,
    name: 'Canned Sardines',
    description:
      'Just in case the world turns upside down again. You still have sardines to eat',
    imageUrl:
      'https://assets.bonappetit.com/photos/5c0590220c552b2d4ec35cf6/master/w_4800,h_2700,c_limit/tinned-fish-10.jpg',
    price: 5,
    inventory: 500
  },
  {
    categoryId: 2,
    name: 'Air Fryer',
    description: 'So you can make french fries at home',
    imageUrl:
      'https://i04.hsncdn.com/is/image/HomeShoppingNetwork/prodfull/dash-chef-series-5-quart-nonstick-air-fryer-with-aircri-d-2019101017005457~657737.jpg',
    price: 399,
    inventory: 500
  },
  {
    categoryId: 2,
    name: 'Elderberry Tea',
    description: 'Rumor has it that elderberries boost your immunity system',
    imageUrl:
      'https://s3.amazonaws.com/cdn.rishi-tea.com/images/uploads/ElderberryHealer_LooseLeaf_Large.jpg',
    price: 22.5,
    inventory: 500
  },
  {
    categoryId: 4,
    name: 'Barber Kit',
    description: 'For your own sanity',
    imageUrl:
      'https://i.pinimg.com/originals/be/44/08/be44082a8e1f152778556a581f241541.jpg',
    price: 215,
    inventory: 300
  },
  {
    categoryId: 3,
    name: 'Fancy Rose Oil Sanitizer Gel',
    description:
      'Fancy rose oil to take your sanitizing game to the next level',
    imageUrl:
      'https://mk0beautybyeartj6cy2.kinstacdn.com/app/uploads/2020/05/Multipack-Hand-Sanitizer-16oz.jpg',
    price: 68,
    inventory: 600
  },
  {
    categoryId: 7,
    name: 'Necklace Air Humidifier',
    description:
      'Wearable and Portable: The mini air purifier is only 30g with an elegent necklace included in the package',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51i3izameZL._AC_SX466_.jpg',
    price: 59,
    inventory: 30
  },
  {
    categoryId: 1,
    name: 'Live Jokes',
    description:
      'The only refundable item in Maison Q. Explosive laughter guaranteed.',
    imageUrl:
      'https://i.pinimg.com/originals/b4/f9/a7/b4f9a703222d96c5ed72ac1b94aeca4e.png',
    price: 255,
    inventory: 50
  },
  {
    categoryId: 2,
    name: 'Bubble Tea Kit',
    description:
      "Make your own bubble tea at home so you don't have to wait 5 hours in the line for some sweetened water with black balls",
    imageUrl:
      'https://o.aolcdn.com/images/dims3/GLOB/legacy_thumbnail/1028x675/format/jpg/quality/85/https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-03%2Fd34ba370-737c-11ea-9aef-2c152f1244d2',
    price: 18,
    inventory: 80
  },
  {
    categoryId: 1,
    name: 'Goat',
    description:
      'Because having a goat is funny and it will make you stand out on your dating profile. I mean, who has a goat? You can also have easily digestible goat milk anytime',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Domestic_goat_kid_in_capeweed.jpg/1200px-Domestic_goat_kid_in_capeweed.jpg',
    price: 8200,
    inventory: 55
  },
  {
    categoryId: 2,
    name: 'Hotpot Kit',
    description:
      "Because you haven't had communal food for 3 months and that's the only thing you want right now",
    imageUrl:
      'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2F1574452197%2Fsteak-and-shrimp-hot-pot-FT-RECIPE1219.jpg%3Fitok%3Dsa2HeQra',
    price: 200,
    inventory: 500
  },
  {
    categoryId: 1,
    name: 'Chickens',
    description:
      'They lay eggs for you everyday and wake you up for Reacto before your alarm does',
    imageUrl:
      'https://www.netclipart.com/pp/m/1-10927_chickens-clip-art-pinterest-farm-animals-clipart.png',
    price: 200,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Fancy Spa Essentials',
    description:
      "When you can't hop on a tropical getaway, treat yourself to the tropical getaway with the ultimate spa set for relaxation and rejuvenation",
    imageUrl:
      'https://cdn.shopify.com/s/files/1/0965/7972/files/just-breathe-hero.jpg?14537188979644486675',
    price: 80,
    inventory: 500
  },
  {
    categoryId: 1,
    name: 'Qurantine Boy Friend For Rental',
    description:
      'Affectionate, caring, and most importantly, COVID-FREE significant other for rental with the potential to renew the retainer',
    imageUrl:
      'https://static01.nyt.com/images/2020/06/07/fashion/07VIRUS-MODERN-BOYFRIEND/07VIRUS-MODERN-BOYFRIEND-mobileMasterAt3x.jpg',
    price: 500,
    inventory: 500
  },
  {
    categoryId: 1,
    name: 'Qurantine Girl Friend For Rental',
    description:
      'Affectionate, caring, and most importantly, COVID-FREE significant other for rental with the potential to renew the retainer',
    imageUrl:
      'https://static01.nyt.com/images/2020/06/07/fashion/07VIRUS-MODERN-BOYFRIEND/07VIRUS-MODERN-BOYFRIEND-mobileMasterAt3x.jpg',
    price: 500,
    inventory: 500
  },
  {
    categoryId: 2,
    name: 'Handmade Pasta with Grandma',
    description:
      'This experience is as much about preparing a delicious dish as it is about recreating a sense of family and honoring a tradition of caregiving that dates back generations.',
    imageUrl:
      'https://www.refinery29.com/images/8815118.png?format=webp&width=720&height=864&quality=85',
    price: 400,
    inventory: 200
  },
  {
    categoryId: 7,
    name: 'Koala Hat',
    description:
      'Adorable koala hat to cover your hair mess just in case you make a hole when you try the new barber kit',
    imageUrl:
      'https://i.pinimg.com/originals/f5/b5/9c/f5b59cc33330c67ccf1cb2f62dc2db45.jpg',
    price: 18,
    inventory: 500
  },
  {
    categoryId: 6,
    name: 'Hypervolt Massage',
    description:
      'The Hypervolt was built to reinvent the massage experience, giving everyone the ability to Move Better. Featuring our lightweight durable ergonomic design you can take the comfort of relaxation on-the-go.',
    imageUrl: 'https://hyperice.com/media/wysiwyg/HV_Render.png',
    price: 399,
    inventory: 200
  },
  {
    categoryId: 6,
    name: 'Mirror',
    description:
      "This smart, space-efficient gym replacement might make you actually want to work out. Plus, it's shiny.",
    imageUrl:
      'https://media.wired.com/photos/5e98ce188283f9000a415215/master/w_2560%2Cc_limit/Gear-Mirror-M696_CSH_181129_PS_Mirror_1986_3000pix_WallEDIT_WARRIOR.jpg',
    price: 1495,
    inventory: 200
  },
  {
    categoryId: 1,
    name: 'Duck',
    description:
      'Because your dog Fluffy told you one day that he got tired of you and wanted a new friend. You love Fluffy so you are going to spend USD 1000 buying a duck for him.',
    imageUrl:
      'https://www.demilked.com/magazine/wp-content/uploads/2019/11/5dd79f2098170-drawing-duck-people-art-62-5dd52ef4a5d63__700.jpg',
    price: 1000,
    inventory: 200
  },
  {
    categoryId: 6,
    name: 'Ostrich Pillow',
    description:
      "Because you want to take a nap and hide from all the nonsense that's happening in this world like a real ostrich",
    imageUrl:
      'https://media-exp1.licdn.com/dms/image/C4D1BAQGR0QIbaDiBOQ/company-background_10000/0?e=2159024400&v=beta&t=4IpNbqv2NZlEp0U9WoE8aXFF-HRaafvG96JF627S108',
    price: 121,
    inventory: 200
  },
  {
    categoryId: 5,
    name: 'Horse Head',
    description: 'Just so you can troll your coworkers on Zoom calls',
    imageUrl: 'https://i.gzn.jp/img/2017/09/15/ostrichpillow-go-review/15.jpg',
    price: 25,
    inventory: 300
  },
  {
    categoryId: 7,
    name: 'Mason Jars',
    description: 'Keep your nuts and pastas organized!',
    imageUrl:
      'https://www.gannett-cdn.com/presto/2020/03/12/USAT/17319655-7306-4360-9ccc-5a65e01bda43-quarantine-hero.jpg?crop=2111,1187,x0,y0&width=1600&height=800&fit=bounds',
    price: 30,
    inventory: 300
  },
  {
    categoryId: 5,
    name: 'Door Pong',
    description:
      "It's ping pong without the table!Attach the clamp to the top of any doorway, turn the dial to adjust the length of the string, and then serve up hours of active fun.",
    imageUrl: 'https://d1jqecz1iy566e.cloudfront.net/extralarge/fa195.jpg',
    price: 67,
    inventory: 300
  },
  {
    categoryId: 5,
    name: 'Foosball Table',
    description:
      'Our Foosball Table is the ultimate addition to any entertainment space, indoors or out. This streamlined design features hand-painted aluminum players and rubber-soled levelers.',
    imageUrl:
      'https://www.shopjanusetcie.com/media/catalog/product/cache/b0b4825818f49d54763c335ba4246ac1/6/5/650-10-816-10-00_1.jpg',
    price: 13000,
    inventory: 200
  },
  {
    categoryId: 3,
    name: 'Lobster Gloves',
    description:
      'You will never have to worry about having human hands again since you can slip these things on any time that you start feeling a little too ordinary.',
    imageUrl:
      'https://images.halloweencostumes.com/products/53905/1-2/pair-of-lobster-claws.jpg',
    price: 32,
    inventory: 200
  },
  {
    categoryId: 1,
    name: 'Body Pillow with Arm',
    description: 'A partner who cuddles and never talks back',
    imageUrl:
      'https://i.pinimg.com/originals/31/bf/70/31bf70a32fa5b30be6f4484321044d22.jpg',
    price: 28,
    inventory: 200
  },
  {
    categoryId: 5,
    name: 'CodeNames',
    description: 'Ever fatasized being a spy?',
    imageUrl:
      'https://cf.geekdo-images.com/opengraph/img/fH8LbVRJJZgIGMLb_rVGZ-0qa-c=/fit-in/1200x630/pic3476592.jpg',
    price: 30,
    inventory: 300
  },
  {
    categoryId: 7,
    name: 'Safety Blanket',
    description:
      'Super soft and cuddly! We all need one in the time of uncertainty',
    imageUrl:
      'https://i.etsystatic.com/8440883/r/il/fad350/1892421607/il_570xN.1892421607_ts3s.jpg',
    price: 22,
    inventory: 200
  },
  {
    categoryId: 4,
    name: 'Barber Lessons',
    description: 'The most desirable skill set in 2020',
    imageUrl:
      'http://bridgei2i.com/blog/wp-content/uploads/2014/08/QT-Barber-2-1024x682.jpg',
    price: 333,
    inventory: 100
  },
  {
    categoryId: 4,
    name: 'Woods Survival 101',
    description:
      "Just in case you decided to live in the woods from now on but don't even know how to make fire",
    imageUrl:
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ5UDRATzREA9nLXcntNsHPUCeSbHRaHJjAH_D1Oe2KH1rFYPF6JY0b0KqfURAwdUPXutS0qp_JLkuZvwef3lqnE551wNFp&usqp=CAY',
    price: 20,
    inventory: 200
  },
  {
    categoryId: 1,
    name: 'Grumpy Cat',
    description: 'Just in case you miss that grumpy coworker in the office',
    imageUrl:
      'https://www.theatermania.com/dyn/photos/theatermania/v1finw2400x0y0w1200h1200/grumpy-cat-will-make-her-broadway-debut-in-cats-118268.jpg',
    price: 52,
    inventory: 400
  },
  {
    categoryId: 2,
    name: 'Super Fresh Sushi Delivery',
    description: 'Exclusively at Maison Q',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/XhJtuR2VPF8UnGWKe2Wp9UzvEWY=/0x0:1016x813/1200x675/filters:focal(427x326:589x488)/cdn.vox-cdn.com/uploads/chorus_image/image/66664161/shunji.0.jpg',
    price: 1000,
    inventory: 500
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await seedCategories()
  await seedProducts()

  console.log(`seeded successfully`)
}

async function seedCategories() {
  const categories = [
    'Loneliness',
    'Hunger',
    'Staying Safe',
    'Learning',
    'Entertaining Yourself',
    'Self Care',
    'Essentials'
  ]
  for (let i = 0; i < categories.length; i++) {
    await Category.create({name: categories[i]})
  }
  console.log(`seeded ${categories.length} categories`)
  return categories
}

//seed products
async function seedProducts() {
  let products = await Product.bulkCreate(prodData)

  console.log(`seeded ${products.length} products`)
  return products
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
