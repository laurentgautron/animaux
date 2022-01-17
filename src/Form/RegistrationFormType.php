<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        if ($options['research']) {
            $builder
                ->add('lastName', null, [
                    'label' => 'Nom',
                    'attr' => ['placeholder' => 'Ex: DUPONT']
                ])
            ;
        } else {
            $builder
                ->add('email', EmailType::class, [
                    'attr' => ['placeholder' => 'Ex: jeanDUPONT@sfr.fr']
                ])
                // to display role when mapped is false
                ->addEventListener(FormEvents::PRE_SET_DATA, function(FormEvent $event) {
                    $entity = $event->getData();
                    $form1 = $event->getForm();
                    $form1->add('roles', ChoiceType::class, [
                        'mapped' => false,
                        // combine these two options to find the right display of choices
                        //'expanded' =>true,
                        //'multiple' => false,
                        'data' => $entity->getRoles() ? $entity->getRoles()[0] : '',
                        'label'   => 'Rôle',
                        'choices' => [
                            'Collaborateur'  => 'ROLE_COLL',
                            'Administrateur' => 'ROLE_ADMIN',
                        ],
                        'constraints' => [
                            new NotBlank(['message' => 'Vous devez choisir un rôle'])
                        ],
                    ]);
                })
                
                ->add('firstName', null, [
                    'label' => 'Prénom',
                    'attr' => ['placeholder' => 'Ex: Jean']
                ])
                ->add('lastName', null, [
                    'label' => 'Nom',
                    'attr' => ['placeholder' => 'Ex: DUPONT']
                ])
                ->add('agreeTerms', CheckboxType::class, [
                    'mapped' => false,
                    'constraints' => [
                        new IsTrue([
                            'message' => 'Vous devez être d\'accord avec les termes.',
                        ]),
                    ],
                ])
                ->add('plainPassword', RepeatedType::class, [
                    // instead of being set onto the object directly,
                    // this is read and encoded in the controller
                    'label' => 'Password',
                    'type' => PasswordType::class,
                    'invalid_message' => 'les deux mots de passe ne correspondent pas',
                    'mapped' => false,
                    'attr' => ['autocomplete' => 'new-password'],
                    'required' => true,
                    'first_options' => ['label' => 'Entrez un mot de passe'],
                    'second_options' => ['label' => 'Entrez une seconde fois le mot de passe'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Please enter a password',
                        ]),
                        new Length([
                            'min' => 6,
                            'minMessage' => 'Your password should be at least {{ limit }} characters',
                            // max length allowed by Symfony for security reasons
                            'max' => 4096,
                        ]),
                    ],
                ])
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
