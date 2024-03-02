*** Settings ***
Library    BuiltIn
Library    random

*** Test Cases ***
# Authentication
Login Successfully
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Login With Incorrect User
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Register New User
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Register Existing User
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s
