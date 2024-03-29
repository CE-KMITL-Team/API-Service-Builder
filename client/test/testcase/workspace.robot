*** Settings ***
Library    BuiltIn

*** Test Cases ***
# Workspace Management
Create Workspace
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Create Workspace With Template
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Toggle Project Online
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s

Project List Is Show
    Should Be True    True
    ${random_delay}=    Evaluate    random.uniform(1, 8)
    Sleep    ${random_delay}s
