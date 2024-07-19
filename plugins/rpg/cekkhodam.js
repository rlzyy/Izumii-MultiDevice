function pickRandom(list) {
	return list[Math.floor(Math.random() * list.length)];
  }

export default {
    command: ["cekkodam", "cekkhodam"],
    description: "Check your khodam",
    example: "",
    name: "Khodam",
    tags: "rpg",

    run: async(m, { conn, command, text }) => {
    if (!text) throw ('Masukin Nama Kamu, Example: .cekkhodam izumi');
	const khodams = [
            { name: "Harimau Putih", meaning: "Kamu kuat dan berani seperti harimau, karena pendahulumu mewariskan kekuatan besar padamu." },
            { name: "Monyet Kekar", meaning: "Kamu lincah dan cerdas, mampu menghadapi berbagai tantangan dengan ketangkasan." },
            { name: "Naga Merah", meaning: "Kamu memiliki kekuatan luar biasa dan kebijaksanaan, seperti naga yang legendaris." },
            { name: "Burung Garuda", meaning: "Kamu bebas dan perkasa, melambangkan kebebasan dan kemuliaan." },
            { name: "Serigala Hitam", meaning: "Kamu setia dan memiliki insting tajam, mampu melindungi diri dan orang lain." },
            { name: "Macan Kumbang", meaning: "Kamu misterius dan kuat, seperti macan yang jarang terlihat tapi selalu waspada." },
            { name: "Kuda Emas", meaning: "Kamu berharga dan kuat, siap untuk berlari menuju kesuksesan." },
            { name: "Elang Biru", meaning: "Kamu memiliki visi yang tajam dan dapat melihat peluang dari jauh." },
            { name: "Harimau Loreng", meaning: "Kamu tangguh dan memiliki kekuatan untuk melindungi dan menyerang." },
            { name: "Gajah Putih", meaning: "Kamu bijaksana dan memiliki kekuatan besar, lambang dari keberanian dan keteguhan hati." },
            { name: "Banteng Sakti", meaning: "Kamu kuat dan penuh semangat, tidak takut menghadapi rintangan." },
            { name: "Ular Raksasa", meaning: "Kamu memiliki kebijaksanaan dan kekuatan tersembunyi, siap menyerang jika diperlukan." },
            { name: "Ikan Dewa", meaning: "Kamu tenang dan penuh kedamaian, membawa rezeki dan keberuntungan." },
            { name: "Kucing Hitam", meaning: "Kamu misterius dan penuh dengan rahasia, membawa keberuntungan bagi yang memahami." },
            { name: "Rusa Emas", meaning: "Kamu anggun dan berharga, selalu dihargai oleh orang-orang di sekitarmu." },
            { name: "Singa Bermahkota", meaning: "Kamu lahir sebagai pemimpin, memiliki kekuatan dan kebijaksanaan seorang raja." },
            { name: "Kijang Perak", meaning: "Kamu cepat dan cekatan, selalu waspada dan siap untuk melompat lebih jauh." },
            { name: "Anjing Pelacak", meaning: "Kamu setia dan penuh dedikasi, selalu menemukan jalan menuju tujuanmu." }
        ];
    const khodam = pickRandom(khodams);
    let spas = ('```');
	const res = `
	Selamat kamu mendapatkan Khodam
	
	${spas} Nama: ${khodam.name} ${spas}
	${spas} Khodam Kamu: ${khodam.meaning} ${spas}
	
	Note: Khodam mu ini sangat berbahaya alangkah baiknya jangan kamu salah gunakan 😈
	  `.trim();
	  conn.reply(m.chat, res, m);
}
}
