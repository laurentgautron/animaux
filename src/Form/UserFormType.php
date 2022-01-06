<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        if ($options['research']) {
            $builder
                ->add('lastName', null, [
                    'label' => 'Nom',
                    'attr' => ['placeholder' => 'Ex: DURAND'],
                ])
            ;
        } else {
            $builder
                ->add('firstName')
                ->add('lastName')
                ->add('email')
                ->add('roles')
                ->add('password')
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
