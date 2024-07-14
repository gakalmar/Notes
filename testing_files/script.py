def high_and_low(numbers):
    nums=numbers.split(" ")
    print(nums)
    lowest=int(nums[0])
    highest=int(nums[0])
    for num in nums:
        if int(num) < lowest:
            lowest=int(num)
        elif int(num) > highest:
            highest=int(num)
    return f"{highest}" + ' ' + f"{lowest}" 

print(high_and_low("8 3 -5 42 -1 0 0 -9 4 7 4 -4"))