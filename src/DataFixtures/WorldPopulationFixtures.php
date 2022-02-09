<?php 

namespace App\DataFixtures;

use App\Entity\WorldPopulation;
use App\Repository\AnimalRepository;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Repository\WorldPopulationRepository;

class WorldPopulationFixtures extends Fixture
{

    public function __construct(AnimalRepository $animalRepository)
    {
        $this->animal = $animalRepository;
    }

    public function load(ObjectManager $manager)
    {
        for ($i = 1; $i <= 40; $i++) {
            $animal = $this->animal->find($i);
            $firstYear = rand(1950, 2007);
            for ($j  = 1; $j <= 15; $j++) {
                $year = strval($firstYear + $j);
                $population = rand(10000, 30000);
                $worldPopulation = new WorldPopulation();
                $worldPopulation->setYear($year);
                $worldPopulation->setPopulation($population);
                $manager->persist($worldPopulation);
                $animal->addWorldPopulation($worldPopulation);
            }
            $manager->persist($animal);
        }

        $manager->flush();
    }
}