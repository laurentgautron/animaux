<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\WorldPopulationRepository;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    itemOperations: [
        'patch' => ['denormalization_context' => ['groups' => ['edit:collection']]],
        'delete',
        'get'
    ]
    // denormalizationContext: ['groups' => ['write:collection']],
    // normalizationContext: ['groups' => ['read:collection']],
)]
#[ORM\Entity(repositoryClass: WorldPopulationRepository::class)]
class WorldPopulation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    #[Groups(['read:collection', 'write:collection', 'edit:collection'])]
    private $population;

    #[ORM\Column(type: 'string', length: 4)]
    #[Groups(['read:collection', 'write:collection'])]
    private $year;

    #[ORM\ManyToOne(targetEntity: Animal::class, inversedBy: 'worldPopulation')]
    #[Groups(['write:collection'])]
    private $animal;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPopulation(): ?int
    {
        return $this->population;
    }

    public function setPopulation(int $population): self
    {
        $this->population = $population;

        return $this;
    }

    public function getYear(): ?string
    {
        return $this->year;
    }

    public function setYear(string $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getAnimal(): ?Animal
    {
        return $this->animal;
    }

    public function setAnimal(?Animal $animal): self
    {
        $this->animal = $animal;

        return $this;
    }
}
