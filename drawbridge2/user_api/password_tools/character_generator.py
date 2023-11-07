import random

class Character_Generator: 
    def get_lowercase():
        return chr(random.randint(97, 122))


    def get_uppercase():
        return chr(random.randint(65, 90))


    def get_number():
        return chr(random.randint(48, 57))


    def get_special():
        spec1 = random.randint(33, 47)
        spec2 = random.randint(58, 64)
        spec3 = random.randint(91, 96)
        spec4 = random.randint(123, 126)
        specials = [spec1, spec2, spec3, spec4]
        return chr(random.choice(specials))