Feature: Calculator

  Scenario Outline: Addition
    Given the calculator is open
    When I enter <input1>
    And I press add
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |      5 |      3 |      8 |
      |    -12 |    100 |     88 |
      |    999 |      0 |    999 |

  Scenario Outline: Subtraction
    Given the calculator is open
    When I enter <input1>
    And I press subtract
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |      5 |      3 |      2 |
      |     12 |    100 |    -88 |
      |    999 |      0 |    999 |

  Scenario Outline: Multiplication
    Given the calculator is open
    When I enter <input1>
    And I press multiply
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |      5 |      3 |     15 |
      |     12 |    100 |   1200 |
      |    999 |      0 |      0 |

  Scenario Outline: Division
    Given the calculator is open
    When I enter <input1>
    And I press divide
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |     15 |      3 |      5 |
      |     12 |    100 |   0.12 |
      |      0 |    999 |      0 |

  Scenario Outline: Division by zero
    Given the calculator is open
    When I enter <input1>
    And I press divide
    And I enter <input2>
    And I press equals
    Then the result should be 0

    Examples:
      | input1 | input2 |
      |      5 |      0 |
      |    100 |      0 |

  Scenario Outline: Clear function
    Given the calculator is open
    When I enter <input1>
    And I press add
    And I enter <input2>
    And I press clear
    Then the result should be 0

    Examples:
      | input1 | input2 |
      |     15 |      3 |
      |     12 |    100 |
      |      0 |    999 |

  Scenario Outline: Decimal addition
    Given the calculator is open
    When I enter <input1>
    And I press add
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |   15.7 |    3.3 |     19 |
      |   12.1 |  100.8 |  112.9 |
      |   0.04 |    999 | 999.04 |

  Scenario Outline: Negative result
    Given the calculator is open
    When I enter <input1>
    And I press subtract
    And I enter <input2>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | result |
      |      3 |     15 |    -12 |
      |     12 |    100 |    -88 |
      |      0 |    999 |   -999 |

  Scenario Outline: multiple operations
    Given the calculator is open
    When I enter <input1>
    And I press add
    And I enter <input2>
    And I press multiply
    And I enter <input3>
    And I press divide
    And I enter <input4>
    And I press equals
    Then the result should be <result>

    Examples:
      | input1 | input2 | input3 | input4 | result |
      |      3 |     15 |    100 |     10 |    180 |
      |  0.003 |     15 |    1.7 |      3 | 8.5017 |
