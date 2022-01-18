<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(UserPasswordHasherInterface $hasher)
    {   
        $this->hasher = $hasher;
        $this->mailAdd = ["hotmail.com", "sfr.fr", "gmail.com", "free.fr", "orange.com"];
    }

    public function load(ObjectManager $manager): void
    {
        $generator = Factory::create("fr_FR");

        for ($i = 0; $i<40; $i++) {
            $user = new User();
            $user->setFirstName($generator->firstName);
            $firstName = strtolower($user->getFirstName());
            $user->setLastName($generator->lastName);
            $lastName = strtolower($user->getLastName());
            $email = $this->mailAdd[array_rand($this->mailAdd)];
            $user->setEmail($lastName.$firstName.'@'.$email);
            //$user->setEmail($generator->email);
            $user->setRoles(["ROLE_COLL"]);
            $user->setPassword($this->hasher->hashPassword($user, 'secret'));
            $manager->persist($user);
        }
        $manager->flush();
    }
}
