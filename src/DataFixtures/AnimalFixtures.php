<?php

namespace App\DataFixtures;

use App\Repository\AnimalRepository;
use App\Repository\ContinentRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AnimalFixtures extends Fixture
{
    public function __construct(AnimalRepository $animalRepository, ContinentRepository $continentRepository)
    {
        $this->continent = $continentRepository;
        $this->animal = $animalRepository;
    }

    public function load (ObjectManager $manager): void
    {
        for ($i=0 ; $i < 40 ;$i++) {
            $animal = $this->animal->find($i + 1);
            for ($j = 0; $j < rand(1, 3); $j++) {
                $continent = $this->continent->find(rand(1, 7));
                $animal->addContinent($continent);
            }
            $manager->persist($animal);
        }
        $manager->flush();
    }
}