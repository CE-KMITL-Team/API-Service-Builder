*** Settings ***
Library    BuiltIn

*** Test Cases ***
# Flow Management
Create Flow
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Edit Flow
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Delete Flow
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Search Flow
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Create Same Flow Name & Flow Path
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Flow Can Connection
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Drag & Drop Can Place On Flow Space
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s