class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: "savana",
        tamanho: 10,
        animais: [{ especie: "macaco", quantidade: 3 }],
      },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      {
        numero: 3,
        bioma: "savana e rio",
        tamanho: 7,
        animais: [{ especie: "gazela", quantidade: 1 }],
      },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      {
        numero: 5,
        bioma: "savana",
        tamanho: 9,
        animais: [{ especie: "leão", quantidade: 1 }],
      },
    ];

    this.animais = [
      { especie: "leão", tamanho: 3, bioma: "savana" },
      { especie: "leopardo", tamanho: 2, bioma: "savana" },
      { especie: "crocodilo", tamanho: 3, bioma: "rio" },
      { especie: "macaco", tamanho: 1, bioma: "savana ou floresta" },
      { especie: "gazela", tamanho: 2, bioma: "savana" },
      { especie: "hipopotamo", tamanho: 4, bioma: "savana ou rio" },
    ];
  }

  // analisaRecintos(animal, quantidade) {
  //   // Conferir se a quantidade de animais é valida, maior que zero e inteiro
  //   if (quantidade < 1 || Math.floor(quantidade) !== quantidade) {
  //       return { erro: "Quantidade inválida" };
  //   }
    
  //   //obtem as informações do animal passado de acordo com this.animais 
  //   const infoAnimal = this.animais.find(
  //     (a) => a.especie.toLowerCase() === animal.toLowerCase()
  //   );
  //   if (!infoAnimal) {
  //       return { erro: "Animal inválido" };
  //   }

  //   //
  //   const recintosCompativeis = this.recintos.filter(
  //     (recinto) =>
  //       //para cada objeto recintos, será passado a função verificaBioma
  //       //e também verifica se o espaço livre() no recinto é maior ou igual ao necessário de acordo com o animal e a quantidade a serem adicionados

  //       this.verificaBioma(animal, recinto.bioma) &&
  //       recinto.tamanho - this.calculaEspacoOcupado(recinto) >=
  //         infoAnimal.tamanho * quantidade
  //   );
  //   // como recintos compativeis irá retonar um array, devido ao filter, verifica-se o tamanho desse array
  //   if (recintosCompativeis.length > 0) {
  //     //map itera em cada recintosCompativeis "r" e aplica a função fornecida a cada elemento, retornando uma nova lista onde cada elemento é a string formatada.
  //     const recintosViaveis = recintosCompativeis.map((r) => {
  //       //faz o calculo do espaco
  //       const espacoOcupado =
  //         this.calculaEspacoOcupado(r) + infoAnimal.tamanho * quantidade;
  //       const espacoLivre = r.tamanho - espacoOcupado;
  //       return `Recinto ${r.numero} (espaço livre: ${espacoLivre} total: ${r.tamanho})`;
  //     });
  //     //retorna um objeto que contém a lista de recintos em string formatada
  //     return { recintosViaveis };
  //   } else {
  //       return { erro: `Não há recinto viável` };
  //   }
  // }

  analisaRecintos(animal, quantidade) {
    // Conferir se a quantidade de animais é valida, maior que zero e inteiro
    if (quantidade < 1 || Math.floor(quantidade) !== quantidade) {
      return { erro: "Quantidade inválida" };
    }
  
    //obtem as informações do animal passado de acordo com this.animais 
    const infoAnimal = this.animais.find(
      (a) => a.especie.toLowerCase() === animal.toLowerCase()
    );
    if (!infoAnimal) {
      return { erro: "Animal inválido" };
    };
    //Por usar o filter, recintosCompativeis irá verificar os 5 disponíveis e armazenar
    const recintosCompativeis = this.recintos.filter((recinto) => {
      //Confere se o bioma do recinto é compatível pela função verificaBioma
      const biomaCompativel = this.verificaBioma(animal, recinto.bioma);
      //Confere se há espaço disponível para a quantidade desejada
      const espacoSuficiente =
        recinto.tamanho - this.calculaEspacoOcupado(recinto) >=
        infoAnimal.tamanho * quantidade;
  
      //Verifica se já existe um carnívoro diferente no recinto
      const recintoComCarnivoro = recinto.animais.some((a) =>
        this.verificaCarnivoro(a.especie)
      );
      if (recintoComCarnivoro) {
        const mesmaEspecie = recinto.animais.every(
          (a) => a.especie.toLowerCase() === animal.toLowerCase()
        );
        if (!mesmaEspecie) {
          return false;
        };
      };
      // Retorna true se todas as condições forem satisfeitas
      return biomaCompativel && espacoSuficiente;
    });

    // como recintos compativeis irá retonar um array, devido ao filter, verifica-se o tamanho desse array
    if (recintosCompativeis.length > 0) {
      //map itera em cada recintosCompativeis "r" e aplica a função fornecida a cada elemento, retornando uma nova lista onde cada elemento é a string formatada.
      const recintosViaveis = recintosCompativeis.map((r) => {
        const espacoOcupado =
          this.calculaEspacoOcupado(r) + infoAnimal.tamanho * quantidade;
        const espacoLivre = r.tamanho - espacoOcupado;
        return `Recinto ${r.numero} (espaço livre: ${espacoLivre} total: ${r.tamanho})`;
      });
      //retorna um objeto que contém a lista de recintos em string formatada
      return { recintosViaveis };
    } else {
      return { erro: `Não há recinto viável` };
    }
  }  


  //Verifica se o bioma do recinto é compatível com o bioma do animal
  verificaBioma(animal, bioma) {
    //find retorna o objeto que satisfizer a condicao seguinte,
    //fará com que o "a" receba cada item de this.animais.especie, se o nome do animal passado como argumento for igual a "a" retona o oobjeto
    const infoAnimal = this.animais.find(
      (a) => a.especie.toLowerCase() === animal.toLowerCase()
    );
    if (!infoAnimal) {
      return false;
    };

    //infoAnimal retona um objeto, logo deve-se acessar o que está dentro de "bioma" desse objeto,
    //como pode ter a chance de retornar "savana ou floresta", usa-se o split, o que dive a string em um array ['savana', 'floresta'].
    const biomasAnimal = infoAnimal.bioma.split(" ou ");
    //includes verifica se o argumento passado está presente em biomasAnimal
    return biomasAnimal.includes(bioma.toLowerCase());
  };

  verificaCarnivoro (animal){
    const carnivoros = ['leão', 'leopardo', 'crocodilo'];
    return carnivoros.includes(animal.toLowerCase());
  };

  
  //calcula quanto do espaço do recinto já está ocupado pelos outros animais presentes
  calculaEspacoOcupado(recinto) {
    let totalOcupado = 0;

    for (const animalRecinto of recinto.animais) {
      const infoAnimal = this.animais.find(
        (animal) =>
          animal.especie.toLowerCase() === animalRecinto.especie.toLowerCase()
      );
      if (infoAnimal) {
        totalOcupado += infoAnimal.tamanho * animalRecinto.quantidade;
      }
    }

    return totalOcupado;
  };
}

export { RecintosZoo as RecintosZoo };