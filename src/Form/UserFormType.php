<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        if ($options['research']) {
            $builder
                ->add('lastName', TextType::class, [
                    'label' => 'Nom',
                    'attr' => ['placeholder' => 'Ex: DURAND'],
                ])
            ;
        } else {
            $builder
                ->add('firstName')
                ->add('lastName')
                ->add('email')
                ->add('roles', ChoiceType::class, [
                    'choices' => [
                        'Administrateur'  => 'ROLE_ADMIN',
                        'Collaborateur'   => 'ROLE_COLL',
                    ],
                    'expanded'  => false,
                    'multiple'  => true,
                    'label'  => 'Rôles',
                ])
                // ->add('password')
            ;
        }

    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefined(['research']);
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
