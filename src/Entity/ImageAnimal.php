<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\AnimalImageController;
use App\Repository\ImageAnimalRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\BooleanFilter;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: ImageAnimalRepository::class)]
//#[ApiFilter(SearchFilter::class, properties: ['animal' => 'exact',])]
// #[ApiFilter(BooleanFilter::class, properties: ['featured'])]
#[
ApiResource(
    attributes: ["pagination_enabled" => false],
    collectionOperations: [
        'get' => [
            'normalization_context' => ['groups' => ['image:read:collection']],
            'denormalization_context' => ['groups' => ['image:write:collection']],
        ],
        'post' => [
            'path' => 'animals/{id}/image',
            'controller' => AnimalImageController::class,
            'normalization_context' => ['groups' => ['image:read:collection']],
            'denormalization_context' => ['groups' => ['image:write:collection']],
            'deserialize' => false
        ]
    ]
),
ApiFilter(SearchFilter::class, properties: ['animal' => 'exact']),
ApiFilter(BooleanFilter::class, properties: ['featured'])
]

class ImageAnimal
{
    #[ORM\Id, ORM\Column, ORM\GeneratedValue]
    private ?int $id = null;

    #[Groups(['image:read:collection', 'read:collection'])]
    public $imageUrl;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="animal_image", fileNameProperty="imagePath")
     */
    public $imageFile;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $imagePath;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(['image:read:collection'])]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: Animal::class, inversedBy: 'image')]
    #[Groups(['image:read:collection'])]
    private $animal;

    #[ORM\Column(type: 'boolean')]
    //#[Groups(['read:collection', 'imge:write:collection'])]
    private $featured;

    public function __construct($animal)
    {
        $this->setAnimal($animal);
    }
    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIamgeFile(): File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile): self
    {
        $this->imageFile = $imageFile;
        if ($this->imageFile instanceof UploadedFile) {
            $this->createdAt = new \DateTimeImmutable();
        }
        
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

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

    public function getImagePath(): string
    {
        return $this->imagePath;
    }

    public function SetImagePath(String $imagePath): ImageAnimal
    {
        $this->imagePath = $imagePath;
        return $this;
    }

    public function getImageUrl(): string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(String $imageUrl): self
    {
        $this->imageUrl = $imageUrl;
        return $this;
    }

    public function getFeatured(): ?bool
    {
        return $this->featured;
    }

    public function setFeatured(bool $featured): self
    {
        $this->featured = $featured;

        return $this;
    }
}
