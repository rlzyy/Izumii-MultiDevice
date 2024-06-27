export default function loadDatabase(m) {
    let isNumber = x => typeof x === "number" && !isNaN(x)
    let isBoolean = x => typeof x === "boolean" && Boolean(x)
    let user = db.users[m.sender], chat = db.chats[m.chat], sett = db.settings

    if (typeof user !== "object") db.users[m.sender] = {}
    if (user) {
					if (!isNumber(user.exp))
						user.exp = 0
					if (!isNumber(user.limit))
						user.limit = 20
				    if (!isNumber(user.uang))
						user.uang = 100
					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!('registered' in user))
						user.registered = false
					if (!('viewstatus' in user))
						user.viewstatus = false
					if (!user.registered) {
						if (!('name' in user))
							user.name = m.name
						if (!isNumber(user.age))
							user.age = -1
						if (!isNumber(user.regTime))
							user.regTime = -1
					}
					if (!isNumber(user.afk))
						user.afk = -1
					if (!('afkReason' in user))
						user.afkReason = ''
					if (!('banned' in user))
						user.banned = false
					if (!('permaban' in user))
						user.permaban = false
					if (!isNumber(user.lastbanned))
						user.lastbanned = 0
					if (!isNumber(user.bannedcd))
						user.bannedcd = 0
					if (!isNumber(user.warn))
						user.warn = 0
					if (!isNumber(user.level))
						user.level = 0
					if (!('role' in user))
						user.role = 'Beginner'
					if (!('autolevelup' in user))
						user.autolevelup = true

					if (!isNumber(user.money))
						user.money = 0
					if (!isNumber(user.atm))
						user.atm = 0
					if (!isNumber(user.health))
						user.health = 100
					if (!isNumber(user.potion))
						user.potion = 0
					if (!isNumber(user.trash))
						user.trash = 0
					if (!isNumber(user.wood))
						user.wood = 0
					if (!isNumber(user.rock))
						user.rock = 0
					if (!isNumber(user.string))
						user.string = 0
					if (!isNumber(user.iron))
						user.iron = 0
					if (!isNumber(user.sand))
						user.sand = 0

					if (!isNumber(user.emerald))
						user.emerald = 0
					if (!isNumber(user.diamond))
						user.diamond = 0
					if (!isNumber(user.gold))
						user.gold = 0
					if (!isNumber(user.steel))
						user.steel = 0
					if (!isNumber(user.kargo))
						user.kargo = 0
					if (!isNumber(user.kapal))
						user.kapal = 0

					if (!isNumber(user.common))
						user.common = 0
					if (!isNumber(user.commoncount))
						user.commoncount = 0
					if (!isNumber(user.uncommon))
						user.uncommon = 0
					if (!isNumber(user.uncommoncount))
						user.uncommoncount = 0
					if (!isNumber(user.mythic))
						user.mythic = 0
					if (!isNumber(user.mythiccount))
						user.mythiccount = 0
					if (!isNumber(user.legendary))
						user.legendary = 0
					if (!isNumber(user.legendarycount))
						user.legendarycount = 0
					if (!isNumber(user.pet))
						user.pet = 0
					if (!isNumber(user.petcount))
						user.petcount = 0
					if (!isNumber(user.petfood))
						user.petfood = 0

					if (!isNumber(user.horse))
						user.horse = 0
					if (!isNumber(user.horseexp))
						user.horseexp = 0
					if (!isNumber(user.cat))
						user.cat = 0
					if (!isNumber(user.catexp))
						user.catexp = 0
					if (!isNumber(user.fox))
						user.fox = 0
					if (!isNumber(user.foxexp))
						user.foxexp = 0
					if (!isNumber(user.dog))
						user.dog = 0
					if (!isNumber(user.dogexp))
						user.dogexp = 0
					if (!isNumber(user.wolf))
						user.wolf = 0
					if (!isNumber(user.wolfexp))
						user.wolfexp = 0
					if (!isNumber(user.centaur))
						user.centaur = 0
					if (!isNumber(user.centaurexp))
						user.centaurexp = 0
					if (!isNumber(user.phoenix))
						user.phoenix = 0
					if (!isNumber(user.phoenixexp))
						user.phoenixexp = 0
					if (!isNumber(user.dragon))
						user.dragon = 0
					if (!isNumber(user.dragonexp))
						user.dragonexp = 0
					if (!isNumber(user.horselvl))
						user.horselvl = 0
					if (!isNumber(user.catlvl))
						user.catlvl = 0
					if (!isNumber(user.foxlvl))
						user.foxlvl = 0
					if (!isNumber(user.doglvl))
						user.doglvl = 0
					if (!isNumber(user.wolflvl))
						user.wolflvl = 0
					if (!isNumber(user.centaurlvl))
						user.centaurlvl = 0
					if (!isNumber(user.phoenixlvl))
						user.phoenixlvl = 0
					if (!isNumber(user.dragonlvl))
						user.dragonlvl = 0
					if (!isNumber(user.horsehealth))
						user.horsehealth = 0
					if (!isNumber(user.cathealth))
						user.cathealth = 0
					if (!isNumber(user.foxhealth))
						user.foxhealth = 0
					if (!isNumber(user.doghealth))
						user.doghealth = 0
					if (!isNumber(user.wolfhealth))
						user.wolfhealth = 0
					if (!isNumber(user.centaurhealth))
						user.centaurhealth = 0
					if (!isNumber(user.phoenixhealth))
						user.phoenixhealth = 0
					if (!isNumber(user.dragonhealth))
						user.dragonhealth = 0

					if (!isNumber(user.horselastfeed))
						user.horselastfeed = 0
					if (!isNumber(user.catlastfeed))
						user.catlastfeed = 0
					if (!isNumber(user.foxlastfeed))
						user.foxlastfeed = 0
					if (!isNumber(user.doglastfeed))
						user.doglastfeed = 0
					if (!isNumber(user.wolflastfeed))
						user.wolflastfeed = 0
					if (!isNumber(user.centaurlastfeed))
						user.centaurlastfeed = 0
					if (!isNumber(user.phoenixlastfeed))
						user.phoenixlastfeed = 0
					if (!isNumber(user.dragonlastfeed))
						user.dragonlastfeed = 0
					if (!isNumber(user.lastadu))
						user.lastadu = 0

					if (!isNumber(user.armor))
						user.armor = 0
					if (!isNumber(user.armordurability))
						user.armordurability = 0
					if (!isNumber(user.sword))
						user.sword = 0
					if (!isNumber(user.sworddurability))
						user.sworddurability = 0
					if (!isNumber(user.pickaxe))
						user.pickaxe = 0
					if (!isNumber(user.pickaxedurability))
						user.pickaxedurability = 0
					if (!isNumber(user.fishingrod))
						user.fishingrod = 0
					if (!isNumber(user.fishingroddurability))
						user.fishingroddurability = 0
					if (!isNumber(user.bow))
						user.bow = 0
					if (!isNumber(user.bowdurability))
						user.bowdurability = 0

					if (!isNumber(user.lastclaim))
						user.lastclaim = 0
					if (!isNumber(user.lastadventure))
						user.lastadventure = 0
					if (!isNumber(user.lastfishing))
						user.lastfishing = 0
					if (!isNumber(user.lastdungeon))
						user.lastdungeon = 0
					if (!isNumber(user.lastduel))
						user.lastduel = 0
					if (!isNumber(user.lastmining))
						user.lastmining = 0
					if (!isNumber(user.lasthunt))
						user.lasthunt = 0
					if (!isNumber(user.lastlumber))
						user.lastlumber = 0
					if (!isNumber(user.lastngojek))
						user.lastngojek = 0
					if (!isNumber(user.lastweekly))
						user.lastweekly = 0
					if (!isNumber(user.lastmonthly))
						user.lastmonthly = 0
					if (!isNumber(user.lastbansos))
						user.lastbansos = 0
					if (!isNumber(user.lastdagang))
						user.lastdagang = 0
					if (!isNumber(user.lastberkebon))
						user.lastberkebon = 0
					if (!isNumber(user.lastmasak))
						user.lastmasak = 0
					if (!isNumber(user.masakcount))
						user.masakcount = 0
					if (!isNumber(user.craftcount))
						user.craftcount = 0
					if (!isNumber(user.adventurecount))
						user.adventurecount = 0
					if (!isNumber(user.mancingcount))
						user.mancingcount = 0
					if (!isNumber(user.lumbercount))
						user.lumbercount = 0
					if (!isNumber(user.ngojekcount))
						user.ngojekcount = 0

					if (!isNumber(user.bibitmangga))
						user.bibitmangga = 0
					if (!isNumber(user.bibitapel))
						user.bibitapel = 0
					if (!isNumber(user.bibitpisang))
						user.bibitpisang = 0
					if (!isNumber(user.bibitjeruk))
						user.bibitjeruk = 0
					if (!isNumber(user.bibitanggur))
						user.bibitanggur = 0
					if (!isNumber(user.mangga))
						user.mangga = 0
					if (!isNumber(user.apel))
						user.apel = 0
					if (!isNumber(user.pisang))
						user.pisang = 0
					if (!isNumber(user.jeruk))
						user.jeruk = 0
					if (!isNumber(user.anggur))
						user.anggur = 0

					if (!isNumber(user.banteng))
						user.banteng = 0
					if (!isNumber(user.harimau))
						user.harimau = 0
					if (!isNumber(user.gajah))
						user.gajah = 0
					if (!isNumber(user.kambing))
						user.kambing = 0
					if (!isNumber(user.panda))
						user.panda = 0
					if (!isNumber(user.buaya))
						user.buaya = 0
					if (!isNumber(user.kerbau))
						user.kerbau = 0
					if (!isNumber(user.sapi))
						user.sapi = 0
					if (!isNumber(user.monyet))
						user.monyet = 0
					if (!isNumber(user.babihutan))
						user.babihutan = 0
					if (!isNumber(user.babi))
						user.babi = 0
					if (!isNumber(user.ayam))
						user.ayam = 0

					if (!isNumber(user.orca))
						user.orca = 0
					if (!isNumber(user.paus))
						user.paus = 0
					if (!isNumber(user.lumba))
						user.lumba = 0
					if (!isNumber(user.hiu))
						user.hiu = 0
					if (!isNumber(user.ikan))
						user.ikan = 0
					if (!isNumber(user.lele))
						user.lele = 0
					if (!isNumber(user.bawal))
						user.bawal = 0
					if (!isNumber(user.nila))
						user.nila = 0
					if (!isNumber(user.kepiting))
						user.kepiting = 0
					if (!isNumber(user.lobster))
						user.lobster = 0
					if (!isNumber(user.gurita))
						user.gurita = 0
					if (!isNumber(user.cumi))
						user.cumi = 0
					if (!isNumber(user.udang))
						user.udang = 0

					if (!isNumber(user.masak))
						user.masak = 0
					if (!isNumber(user.masakrole))
						user.masakrole = 0
					if (!isNumber(user.masakexp))
						user.masakexp = 0
					if (!isNumber(user.masaklevel))
						user.masaklevel = 0

					if (!isNumber(user.bawang))
						user.bawang = 0
					if (!isNumber(user.cabai))
						user.cabai = 0
					if (!isNumber(user.kemiri))
						user.kemiri = 0
					if (!isNumber(user.jahe))
						user.jahe = 0
					if (!isNumber(user.saus))
						user.saus = 0
					if (!isNumber(user.asam))
						user.asam = 0

					if (!isNumber(user.steak))
						user.steak = 0
					if (!isNumber(user.sate))
						user.sate = 0
					if (!isNumber(user.rendang))
						user.rendang = 0
					if (!isNumber(user.kornet))
						user.kornet = 0
					if (!isNumber(user.nugget))
						user.nugget = 0
					if (!isNumber(user.bluefin))
						user.bluefin = 0
					if (!isNumber(user.seafood))
						user.seafood = 0
					if (!isNumber(user.sushi))
						user.sushi = 0
					if (!isNumber(user.moluska))
						user.moluska = 0
					if (!isNumber(user.squidprawm))
						user.squidprawm = 0

					if (!isNumber(user.rumahsakit))
						user.rumahsakit = 0
					if (!isNumber(user.restoran))
						user.restoran = 0
					if (!isNumber(user.pabrik))
						user.pabrik = 0
					if (!isNumber(user.tambang))
						user.tambang = 0
					if (!isNumber(user.pelabuhan))
						user.pelabuhan = 0
					if (!('rumahsakitname' in user))
						user.rumahsakitname = ''
					if (!('restoranname' in user))
						user.restoranname = ''
					if (!('pabrikname' in user))
						user.pabrikname = ''
					if (!('tambangname' in user))
						user.tambangname = ''
					if (!('pelabuhanname' in user))
						user.pelabuhanname = ''
					if (!('openaitxt' in user))
						user.openaitxt = []
					if (!isNumber(user.rumahsakitexp))
						user.rumahsakitexp = 0
					if (!isNumber(user.restoranexp))
						user.restoranexp = 0
					if (!isNumber(user.pabrikexp))
						user.pabrikexp = 0
					if (!isNumber(user.tambangexp))
						user.tambangexp = 0
					if (!isNumber(user.pelabuhanexp))
						user.pelabuhanexp = 0
					if (!isNumber(user.rumahsakitlvl))
						user.rumahsakitlvl = 0
					if (!isNumber(user.restoranlvl))
						user.restoranlvl = 0
					if (!isNumber(user.pabriklvl))
						user.pabriklvl = 0
					if (!isNumber(user.tambanglvl))
						user.tambanglvl = 0
					if (!isNumber(user.pelabuhanlvl))
						user.pelabuhanlvl = 0
					if (!isNumber(user.expired))
						user.expired = 0
					if (!isNumber(user.spamcount))
						user.spamcount = 0
    } else {
        db.users[m.sender] = {
                    exp: 0,
					limit: 20,
					uang: 100,
					lastclaim: 0,
					registered: false,
					viewstatus: false,
					name: m.name,
					age: -1,
					regTime: -1,
					afk: -1,
					afkReason: '',
					banned: false,
					permaban: false,
					lastbanned: 0,
					bannedcd: 0,
					warn: 0,
					level: 0,
					role: 'Beginner',
					autolevelup: true,

					money: 0,
					atm: 0,
					health: 100,
					potion: 10,
					trash: 0,
					wood: 0,
					rock: 0,
					string: 0,
					iron: 0,
					sand: 0,

					emerald: 0,
					diamond: 0,
					gold: 0,
					steel: 0,
					kargo: 0,
					kapal: 0,

					common: 0,
					commoncount: 0,
					uncommon: 0,
					uncommoncount: 0,
					mythic: 0,
					mythiccount: 0,
					legendary: 0,
					legendarycount: 0,
					pet: 0,
					petcount: 0,
					petfood: 0,

					horse: 0,
					horseexp: 0,
					cat: 0,
					catexp: 0,
					fox: 0,
					foxexp: 0,
					dog: 0,
					dogexp: 0,
					wolf: 0,
					wolfexp: 0,
					centaur: 0,
					centaurexp: 0,
					phoenix: 0,
					phoenixexp: 0,
					dragon: 0,
					dragonexp: 0,
					horselvl: 0,
					catlvl: 0,
					foxlvl: 0,
					doglvl: 0,
					wolflvl: 0,
					centaurlvl: 0,
					phoenixlvl: 0,
					dragonlvl: 0,
					horsehealth: 0,
					cathealth: 0,
					foxhealth: 0,
					doghealth: 0,
					wolfhealth: 0,
					centaurhealth: 0,
					phoenixhealth: 0,
					dragonhealth: 0,

					horselastfeed: 0,
					catlastfeed: 0,
					foxlastfeed: 0,
					doglastfeed: 0,
					wolflastfeed: 0,
					centaurlastfeed: 0,
					phoenixlastfeed: 0,
					dragonlastfeed: 0,
					lastadu: 0,

					armor: 0,
					armordurability: 0,
					sword: 0,
					sworddurability: 0,
					pickaxe: 0,
					pickaxedurability: 0,
					fishingrod: 0,
					fishingroddurability: 0,
					bow: 0,
					bowdurability: 0,

					lastclaim: 0,
					lastadventure: 0,
					lastfishing: 0,
					lastdungeon: 0,
					lastduel: 0,
					lastmining: 0,
					lasthunt: 0,
					lastlumber: 0,
					lastngojek: 0,
					lastweekly: 0,
					lastmonthly: 0,
					lastbansos: 0,
					lastdagang: 0,
					lastberkebon: 0,
					lastmasak: 0,
					masakcount: 0,
					craftcount: 0,
					adventurecount: 0,
					mancingcount: 0,
					lumbercount: 0,
					ngojekcount: 0,

					bibitmangga: 0,
					bibitapel: 0,
					bibitpisang: 0,
					bibitjeruk: 0,
					bibitanggur: 0,
					mangga: 0,
					apel: 0,
					pisang: 0,
					jeruk: 0,
					anggur: 0,

					banteng: 0,
					harimau: 0,
					gajah: 0,
					panda: 0,
					kambing: 0,
					buaya: 0,
					kerbau: 0,
					sapi: 0,
					monyet: 0,
					babihutan: 0,
					babi: 0,
					ayam: 0,

					orca: 0,
					paus: 0,
					lumba: 0,
					hiu: 0,
					ikan: 0,
					lele: 0,
					bawal: 0,
					nila: 0,
					kepiting: 0,
					lobster: 0,
					gurita: 0,
					cumi: 0,
					udang: 0,

					masak: 0,
					masakrole: 0,
					masakexp: 0,
					masaklevel: 0,

					bawang: 0,
					cabai: 0,
					kemiri: 0,
					jahe: 0,
					saus: 0,
					asam: 0,

					steak: 0,
					sate: 0,
					rendang: 0,
					kornet: 0,
					nugget: 0,
					bluefin: 0,
					seafood: 0,
					sushi: 0,
					moluska: 0,
					squidprawm: 0,

					rumahsakit: 0,
					restoran: 0,
					pabrik: 0,
					tambang: 0,
					pelabuhan: 0,
					rumahsakitname: '',
					restoranname: '',
					pabrikname: '',
					tambangname: '',
					pelabuhanname: '',
					openaitxt: [],
					rumahsakitexp: 0,
					restoranexp: 0,
					pabrikexp: 0,
					tambangexp: 0,
					pelabuhanexp: 0,
					rumahsakitlvl: 0,
					restoranlvl: 0,
					pabriklvl: 0,
					tambanglvl: 0,
					pelabuhanlvl: 0,
					expired: 0,
					spamcount: 0,
        }
    }

    if (m.isGroup) {
        if (typeof chat !== "object") db.chats[m.chat] = {}
        if (chat) {
            if (!isBoolean(chat.antibot)) chat.antibot = false
            if (!isBoolean(chat.antidelete)) chat.antidelete = true
            if (!isBoolean(chat.antilink)) chat.antilink = false
            if (!isBoolean(chat.antispam)) chat.antispam = false
            if (!isBoolean(chat.antitoxic)) chat.antitoxic = false
            if (!isBoolean(chat.detect)) chat.detect = true
            if (!isNumber(chat.expired)) chat.expired = 0
            if (!isBoolean(chat.isBanned)) chat.isBanned = false
            if (!isBoolean(chat.nsfw)) chat.nsfw = false
            if (!isBoolean(chat.simi)) chat.simi = false
            if (!isBoolean(chat.viewOnce)) chat.viewonce = false
            if (!isBoolean(chat.welcome)) chat.welcome = true
        } else {
            db.chats[m.chat] = {
                antibot: false,
                antidelete: true,
                antilink: false,
                antispam: false,
                antitoxic: false,
                detect: true,
                expired: 0,
                isBanned: false,
                nsfw: false,
                simi: false,
                viewonce: false,
                welcome: true
            }
        }
    }

    if (typeof sett !== "object") db.settings = {}
    if (sett) {
        if (!isBoolean(sett.anticall)) sett.anticall = true
        if (!isBoolean(sett.autoread)) sett.autoread = false
        if (!isBoolean(sett.gconly)) sett.gconly = false
        if (!isBoolean(sett.pconly)) sett.pconly = false
        if (!isBoolean(sett.self)) sett.self = false
    } else {
        db.settings = {
            anticall: true,
            autoread: false,
            gconly: false,
            pconly: false,
            self: false
        }
    }
}