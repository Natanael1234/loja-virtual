'use strict';
const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const sequence = {
    _id: 1,
    get id() { return this._id++; }
}

const produtos = {};


function geraProdutos (gerarIds) {
    let data = [      
        {  folder: "notebook_acer",  nome :"Notebook Acer Aspire 3 A315-42G-R6FZ AMD R5 8GB (AMD Radeon 540 com 2GB) 1TB HDD 15.6 Windows 10" },
        {  folder: "notebook_asus",  nome :"Notebook Asus X543MA-GO820T Intel Celeron 4GB 500GB 15,6\" Windows 10 - Cinza Escuro" },
        {  folder: "notebook_dell",  nome :"Notebook Inspiron I15-3583-A20P Intel Core i5 8GB (AMD Radeon 520 com 2GB) 2TB 15,6'' W10 Preto - Dell" },
        {  folder: "notebook_lenovo",  nome :"Notebook Lenovo Ideapad S145 Intel Celeron 4GB 500GB 15,6\" W10 Prata" },
        {  folder: "notebook_samsung",  nome :"Notebook Essentials E30 Intel Core I3 4GB 1TB LED Full HD 15.6'' W10 Cinza Titânio - Samsung" },
        {  folder: "tv_samsung",  nome :"Smart TV LED 50\" Samsung 50RU7100 Ultra HD 4K com Conversor Digital 3 HDMI 2 USB Wi-Fi Visual Livre de Cabos Controle Remoto Único e Bluetooth" },
        {  folder: "tv_semp",  nome :"Smart Tv Led 49\" Semp Sk6200 Ultra Hd 4k Hdr 49sk6200" },
        {  folder: "tv_lg",  nome :"Smart TV LED 50'' LG 50UM7510 Ultra HD 4K Thinq AI Conversor Digital Integrado Wi-Fi 4 HDMI 2 USB PiP" },
        {  folder: "tv_sony",  nome :"Smart TV LED 50\" Sony KDL-50W665F Full HD com Conversor Digital 2 HDMI 2 USB Wi-Fi 60Hz - Preta" },
        {  folder: "tv_philips",  nome :"Smart TV LED 50\" Philips 50PUG6513/78 Ultra HD 4k com Conversor Digital 3 HDMI 2 USB Wi-Fi 60hz - Prata" },
        {  folder: "celular_lg",  nome :"Smartphone LG K61 Dual Chip Android 9.0 Pie 6.53\" Octa Core 128GB 4G Câmera 48M+W8M+D5M+M2M - Branco" },
        {  folder: "celular_samsung",  nome :"Smartphone Samsung Galaxy S10 128GB Dual Chip Android Tela 6.1” Octa-Core 4G Câmera Tripla Traseira 12MP + 12MP + 16MP - Preto" },
        {  folder: "celular_apple",  nome :"iPhone XR 128GB Preto Tela 6.1” iOS 12 4G 12MP - Apple" },
        {  folder: "celular_motorola",  nome :"Moto G8 Plus - Azul Safira" },
        {  folder: "celular_asus",  nome :"ASUS Zenfone Max Pro (M2) 4GB/64GB Black Saphire" },
        {  folder: "tablet_samsung",  nome :"Tablet Galaxy Tab S7 256GB Wifi 4G Tela 11\" Android Octa-Core Câmera 13 MP + 5MP - Grafite" },
        {  folder: "tablet_apple",  nome :"iPad (7ª geração) 32GB Wi-Fi Tela Retina 10,2'' Bluetooth Câmera de 8 MP Cinza Espacial - Apple" },
        {  folder: "tablet_positivo",  nome :"Tablet Positivo Modelo T1085 Octa Core 4g Android 9.0 Pie" },
        {  folder: "tablet_multilaser",  nome :"Tablet Multilaser M7s Go Wi-fi 7 Pol. 16gb Quad Core Android 8.1 Preto Nb316" },
        {  folder: "tablet_philco",  nome :"Tablet Philco Ptb10rsg 3g 32gb, Android Pie 9.0, Dual Sim E Tela Multi-toque. "}    
      ];
  
      // gerador de lero-lero para descrição
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
      });
      
      // gera dados adicionais.
      let seedData = data.map((produto, index)=>{
        let imagens = [];
        for(let i = 1; i <= 4; i++) {
          imagens.push('imgs/produtos/' + produto.folder + '/' + i + '.jpg')
        }
        let descricao = lorem.generateParagraphs(1);
        let thumbnail = 'imgs/produtos/' + produto.folder + '/' + '1.jpg';
        let quantidadeEstoque = Math.round(Math.random() * 100);
        let preco = Math.round(Math.random() * 1000000) / 100;
        let dadosProduto = {
            id: gerarIds ? sequence.id : undefined,
            nome: produto.nome,
            cod: index + 1,
            descricao,
            preco,
            thumbnail,
            imagens:JSON.stringify(imagens),
            quantidadeEstoque,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        return dadosProduto;
      });
    
      // console.log('SEED DATA', JSON.stringify(seedData[0],null,4))
      return seedData;
}

module.exports = geraProdutos