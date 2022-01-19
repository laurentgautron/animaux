<?php

namespace App\DataFixtures;

use App\Entity\Animal;
use Faker\Factory;
use App\Entity\User;
use App\Repository\AnimalRepository;
use App\Repository\ContinentRepository;
use App\Repository\UserRepository;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(UserPasswordHasherInterface $hasher, AnimalRepository $animalRepository, ContinentRepository $continentRepository)
    {   
        $this->hasher = $hasher;
        $this->animalRepository = $animalRepository;
        $this->continentRepository = $continentRepository;
        $this->mailAdd = ["hotmail.com", "sfr.fr", "gmail.com", "free.fr", "orange.com"];
    }

    public function load(ObjectManager $manager): void
    {
        $generator = Factory::create("fr_FR");

        // for ($i = 0; $i<40; $i++) {
        //     $user = new User();
        //     $user->setFirstName($generator->firstName);
        //     $firstName = strtolower($user->getFirstName());
        //     $user->setLastName($generator->lastName);
        //     $lastName = strtolower($user->getLastName());
        //     $email = $this->mailAdd[array_rand($this->mailAdd)];
        //     $user->setEmail($lastName.$firstName.'@'.$email);
        //     //$user->setEmail($generator->email);
        //     $user->setRoles(["ROLE_COLL"]);
        //     $user->setPassword($this->hasher->hashPassword($user, 'secret'));
        //     $manager->persist($user);
        // }

        // for ($j = 0; $j < 40; $j++) {
        //     $animal = new Animal();
        //     $animal->setName('vide');
        //     $description = implode(". ", $generator->paragraphs(3));
        //     $animal->setDescription($description);
        //     $manager->persist($animal);
        // }

        
            $animal = $this->animalRepository->find(1);
            $continent = $this->continentRepository->find(rand(1, 7));
            $animal-> addContinent($continent);
            $manager->persist($animal);

        $manager->flush();
    }
}
