import random
import string


def generateId(n):
    res = ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=n))
    return res