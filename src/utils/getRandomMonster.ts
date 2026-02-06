const MAX_DEX_ID = 493;

export const getRandomMonster: (notThisOne?: number) => number = (notThisOne?: number) => {
    const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) +1;

    if (pokedexNumber !== notThisOne) return pokedexNumber;
    return getRandomMonster(notThisOne);
    }


export const getOptionsForVote = () => {
    const firstId = getRandomMonster();
    const secondId = getRandomMonster(firstId);

    return [firstId, secondId];

} 

