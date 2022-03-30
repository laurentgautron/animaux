<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Controller\AnimalImageController;
use App\Repository\ImageAnimalRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * @Vich\Uploadable
 */
#[ORM\Entity(repositoryClass: ImageAnimalRepository::class)]
#[ApiResource(
    attributes: [
        'input_formats' => [
            'jsonld' => 'application/ld+json',
            'json' => 'application/json'
        ],
        'output_formats' => [
            'jsonld' => 'application/ld+json',
            'json' => 'application/json'
        ]
    ],
    collectionOperations: [
        'get',
        'image' => [
            'path' => 'animals/{id}/image',
            'method' => 'post',
            'controller' => AnimalImageController::class,
            'normalization_context' => ['groups' => ['image:read:collection']],
            'denormalization_context' => ['groups' => ['image:write:collection']],
            'deserialize' => false
        ]
    ]
)]

class ImageAnimal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['image:read:collection', 'image:write:collection'])]
    private $imagePath;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    // #[Groups(['image:read:collection', 'image:write:collection'])]
    private $imageUrl;

    /**
     * @Vich\UploadableField(mapping="animal_image", fileNameProperty="imagePath")
     *
     * @var File|null
     */
    private $imageFile;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(['image:read:collection', 'image:write:collection'])]
    private $createdAt;

    #[ORM\ManyToOne(targetEntity: Animal::class, inversedBy: 'image')]
    #[Groups(['image:read:collection','image:write:collection'])]
    private $animal;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): self
    {
        $this->imagePath = $imagePath;

        return $this;
    }

    public function getImageUrl(): ?string
    {
        return $this->imageUrl;
    }

    public function setImageUrl(?string $imageUrl): self
    {
        $this->imageUrl = $imageUrl;

        return $this;
    }

    public function getIamgeFile(): File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile)
    {
        $this->imageFile = $imageFile;
        if ($this->imageFile instanceof UploadedFile) {
            $this->createdAt = new \DateTimeImmutable;
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
}
