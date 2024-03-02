*** Settings ***
Library    BuiltIn

*** Test Cases ***
# Model Management
Create Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Edit Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Delete Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Add Data to Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Delete Data from Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Edit Data in Model
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Model Search
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Model Data Search
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Create Same Model Name
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Add Wrong Data Model Type
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s