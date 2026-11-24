export type Pet = {
  petId: string,
  idle: string[],
  action: string[],
  exercising: string[],
  celebrating: string[],
}

export function getPetById(petId: string): Pet | undefined {
  return pets.find(pet => pet.petId === petId);
}


export const pets: Pet[] = [
  {
    petId: '000',
    idle: [
      'pet_1_1.png',
      'pet_1_2.png',
    ],
    action: [
      'pet_1_3.png',
      'pet_1_4.png',
    ],
    exercising: [
      'pet_1_5.png',
      'pet_1_6.png',
    ],
    celebrating: [
      'pet_1_7.png',
      'pet_1_8.png',
    ]
  }
]