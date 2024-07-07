def square_digits(num):
    nums_as_string=f"{num}"
    return_string=""
    for char in nums_as_string:
        return_string+=f"{int(char) ** 2}"
    return int(return_string)

print(square_digits(9119))