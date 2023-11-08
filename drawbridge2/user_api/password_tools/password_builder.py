import random

from .character_generator import Character_Generator as char_gen

def build_password(length, include_lower, include_upper, include_number, include_special):
    parameters = []
    password_chars = []

    '''include the selected password parameters'''
    if include_lower:
        parameters.append(char_gen.get_lowercase)
    if include_upper:
        parameters.append(char_gen.get_uppercase)
    if include_number:
        parameters.append(char_gen.get_number)
    if include_special:
        parameters.append(char_gen.get_special)

    '''add at least one character from each of the selected parameters'''
    for parameter in range(len(parameters)):
        character = parameters[parameter]
        password_chars.append(character())

    '''cycle through adding more random characters within the parameters to meet the length requirement'''
    if length > len(password_chars):
        for letter in range(length - len(password_chars)):
            character = random.choice(parameters)
            password_chars.append(character())

    '''shuffle, join and return the new password'''
    random.shuffle(password_chars)
    return ''.join(password_chars)
