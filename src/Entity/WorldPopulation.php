<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\WorldPopulationRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    attributes: [
        'pagination_items_per_page' => 9,
        'input_formats' => [
            'jsonld' => 'application/ld+json',
            'json' => 'application/json'
        ],
        'output_formats' => [
            'jsonld' => 'application/ld+json',
            'json' => 'application/json'
        ]
    ],
    normalizationContext: ['groups' => ['worldPopulation:read:collection']],
    denormalizationContext: ['groups' => ['worldPopulation:write:collection']],
)]
#[ApiFilter(SearchFilter::class, properties: ['animal' => 'exact'])]
#[ORM\Entity(repositoryClass: WorldPopulationRepository::class)]
class WorldPopulation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer')]
    #[Assert\NotEqualTo(0)]
    #[Groups([
        'worldPopulation:read:collection',
        'worldPopulation:write:collection',
    ])]
    private $population;

    #[ORM\Column(type: 'string', length: 4)]
    #[Assert\NotBlank()]
    #[Groups([
        'worldPopulation:read:collection',
        'worldPopulation:write:collection',
    ])]
    private $year;

    #[ORM\ManyToOne(targetEntity: Animal::class, inversedBy: 'worldPopulation')]
    #[Groups([
        'worldPopulation:read:collection',
        'worldPopulation:write:collection'
    ])]
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
